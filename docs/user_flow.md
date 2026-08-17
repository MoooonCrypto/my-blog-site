# User Flow

## Visitor

```mermaid
graph TD
  A[Home] --> B[Products]
  A --> C[Blog]
  A --> D[Profile]
  B --> E[Product detail]
  C --> F[Blog detail]
  E --> G[Demo / App link]
  E --> H[GitHub]
  D --> I[External links]
```

## Admin

```mermaid
graph TD
  A[Admin login] --> B[Dashboard]
  B --> C[Products admin]
  B --> D[Blog admin]
  B --> E[Profile admin]
  C --> F[Create / edit product]
  C --> G[Manage screenshots]
  D --> H[Create / edit post]
  E --> I[Edit profile and social links]
  F --> J[Upload image to R2]
  G --> J
  I --> J
```

## Visibility Rules

- Public pages show only records where `published` is true.
- Admin pages show draft and published records.
- Product links are selected by platform:
  - iOS: `app_store_url`
  - Android: `play_store_url`
  - Web / Other: `demo_url`
