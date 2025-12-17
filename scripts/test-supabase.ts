/**
 * Supabase接続とセキュリティテストスクリプト
 *
 * 実行方法: npx tsx scripts/test-supabase.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/types/database.types'

// .env.localを読み込む
config({ path: resolve(__dirname, '../.env.local') })

// 環境変数から取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ エラー: Supabase環境変数が設定されていません')
  console.log('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '設定済み' : '未設定')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// テスト結果を格納
const results: { test: string; status: 'PASS' | 'FAIL'; message: string }[] = []

function logTest(test: string, status: 'PASS' | 'FAIL', message: string) {
  results.push({ test, status, message })
  const icon = status === 'PASS' ? '✅' : '❌'
  console.log(`${icon} ${test}: ${message}`)
}

async function testConnection() {
  console.log('\n📡 Supabase接続テスト')
  console.log('=' .repeat(50))

  try {
    const { data, error } = await supabase.from('profiles').select('count').single()

    if (error) {
      logTest('接続テスト', 'FAIL', `接続エラー: ${error.message}`)
      return false
    }

    logTest('接続テスト', 'PASS', 'Supabaseへの接続成功')
    return true
  } catch (error) {
    logTest('接続テスト', 'FAIL', `予期しないエラー: ${error}`)
    return false
  }
}

async function testTableAccess() {
  console.log('\n📊 テーブルアクセステスト')
  console.log('=' .repeat(50))

  const tables = ['blog_posts', 'portfolio_items', 'sandbox_items', 'profiles'] as const

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1)

      if (error) {
        logTest(`${table}テーブル`, 'FAIL', `アクセスエラー: ${error.message}`)
      } else {
        logTest(`${table}テーブル`, 'PASS', `アクセス成功 (${data?.length || 0}件)`)
      }
    } catch (error) {
      logTest(`${table}テーブル`, 'FAIL', `予期しないエラー: ${error}`)
    }
  }
}

async function testRLSPolicies() {
  console.log('\n🔒 RLSポリシーテスト')
  console.log('=' .repeat(50))

  // 1. 公開記事の取得（未認証でもアクセス可能）
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)

    if (error) {
      logTest('公開記事の取得', 'FAIL', `エラー: ${error.message}`)
    } else {
      logTest('公開記事の取得', 'PASS', `未認証でも公開記事にアクセス可能 (${data.length}件)`)
    }
  } catch (error) {
    logTest('公開記事の取得', 'FAIL', `予期しないエラー: ${error}`)
  }

  // 2. 記事の作成（未認証ではエラーになるはず）
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: 'テスト記事',
        slug: 'test-' + Date.now(),
        content: 'テストコンテンツ',
        published: false,
      })
      .select()

    if (error) {
      if (error.message.includes('policy') || error.message.includes('permission')) {
        logTest('記事作成（未認証）', 'PASS', 'RLSポリシーにより未認証での作成が拒否されました（正常）')
      } else {
        logTest('記事作成（未認証）', 'FAIL', `予期しないエラー: ${error.message}`)
      }
    } else {
      logTest('記事作成（未認証）', 'FAIL', '未認証でも記事作成ができてしまいました（RLS設定に問題）')

      // 作成されたテストデータを削除（管理画面から手動削除が必要）
      console.log('⚠️  警告: テストデータが作成されました。ID:', data[0]?.id)
    }
  } catch (error) {
    logTest('記事作成（未認証）', 'FAIL', `予期しないエラー: ${error}`)
  }

  // 3. プロフィールの取得（誰でもアクセス可能）
  let profileId: string | null = null
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      logTest('プロフィールの取得', 'FAIL', `エラー: ${error.message}`)
    } else {
      profileId = data.id
      logTest('プロフィールの取得', 'PASS', 'プロフィールへのアクセス成功')
    }
  } catch (error) {
    logTest('プロフィールの取得', 'FAIL', `予期しないエラー: ${error}`)
  }

  // 4. プロフィールの更新（未認証ではエラーになるはず）
  if (profileId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ name: 'テスト更新' })
        .eq('id', profileId)
        .select()

      if (error) {
        if (error.message.includes('policy') || error.message.includes('permission') || error.message.includes('denied')) {
          logTest('プロフィール更新（未認証）', 'PASS', 'RLSポリシーにより未認証での更新が拒否されました（正常）')
        } else {
          logTest('プロフィール更新（未認証）', 'FAIL', `予期しないエラー: ${error.message}`)
        }
      } else {
        if (data && data.length > 0) {
          logTest('プロフィール更新（未認証）', 'FAIL', '未認証でもプロフィール更新ができてしまいました（RLS設定に問題）')
        } else {
          logTest('プロフィール更新（未認証）', 'PASS', 'RLSポリシーにより更新が拒否されました（0行更新）')
        }
      }
    } catch (error) {
      logTest('プロフィール更新（未認証）', 'FAIL', `予期しないエラー: ${error}`)
    }
  } else {
    logTest('プロフィール更新（未認証）', 'FAIL', 'プロフィールIDが取得できませんでした')
  }
}

async function testDatabaseStructure() {
  console.log('\n🏗️  データベース構造テスト')
  console.log('=' .repeat(50))

  // 各テーブルの必須カラムをチェック
  const expectedColumns = {
    blog_posts: ['id', 'title', 'slug', 'content', 'published', 'created_at'],
    portfolio_items: ['id', 'title', 'slug', 'description', 'published', 'created_at'],
    sandbox_items: ['id', 'title', 'slug', 'description', 'published', 'created_at'],
    profiles: ['id', 'name', 'bio', 'created_at'],
  }

  for (const [table, columns] of Object.entries(expectedColumns)) {
    try {
      const { data, error } = await supabase
        .from(table as keyof typeof expectedColumns)
        .select(columns.join(','))
        .limit(1)

      if (error) {
        logTest(`${table}構造`, 'FAIL', `カラムアクセスエラー: ${error.message}`)
      } else {
        logTest(`${table}構造`, 'PASS', `必須カラムが存在`)
      }
    } catch (error) {
      logTest(`${table}構造`, 'FAIL', `予期しないエラー: ${error}`)
    }
  }
}

async function runAllTests() {
  console.log('🧪 Supabase セキュリティ & 接続テスト')
  console.log('=' .repeat(50))
  console.log(`URL: ${supabaseUrl}`)
  console.log(`Key: ${supabaseAnonKey.substring(0, 20)}...`)
  console.log('')

  const isConnected = await testConnection()

  if (!isConnected) {
    console.log('\n❌ 接続に失敗したため、テストを中断します')
    console.log('\n📋 対処方法:')
    console.log('  1. .env.local ファイルが存在するか確認')
    console.log('  2. NEXT_PUBLIC_SUPABASE_URL が正しいか確認')
    console.log('  3. NEXT_PUBLIC_SUPABASE_ANON_KEY が正しいか確認')
    console.log('  4. Supabaseプロジェクトが起動しているか確認')
    process.exit(1)
  }

  await testTableAccess()
  await testRLSPolicies()
  await testDatabaseStructure()

  // サマリー
  console.log('\n📊 テスト結果サマリー')
  console.log('=' .repeat(50))

  const passCount = results.filter(r => r.status === 'PASS').length
  const failCount = results.filter(r => r.status === 'FAIL').length
  const totalCount = results.length

  console.log(`合計: ${totalCount}件`)
  console.log(`✅ 成功: ${passCount}件`)
  console.log(`❌ 失敗: ${failCount}件`)
  console.log(`成功率: ${((passCount / totalCount) * 100).toFixed(1)}%`)

  if (failCount > 0) {
    console.log('\n⚠️  以下のテストが失敗しました:')
    results
      .filter(r => r.status === 'FAIL')
      .forEach(r => console.log(`  - ${r.test}: ${r.message}`))
  }

  console.log('\n' + '=' .repeat(50))
  if (failCount === 0) {
    console.log('🎉 全てのテストが成功しました！')
  } else {
    console.log('⚠️  一部のテストが失敗しました。上記のエラーを確認してください。')
  }
}

runAllTests().catch(error => {
  console.error('❌ テスト実行中にエラーが発生しました:', error)
  process.exit(1)
})
