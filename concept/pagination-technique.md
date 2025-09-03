https://slack.engineering/evolving-api-pagination-at-slack/

# Pagination Technique

### 🔹 1. Offset-based Pagination

- Uses SQL LIMIT + OFFSET (e.g., SELECT * FROM users LIMIT 10 OFFSET 20;).

- ***Pros:*** Simple to implement, widely supported.

- ***Cons:*** Gets slower with large offsets (because DB still scans skipped rows). Can cause duplicate/missing data if records change during pagination.

    Use case: Small datasets, admin dashboards.

### 🔹 2. Cursor-based Pagination (a.k.a. Keyset Pagination)

- Uses a unique field (like id, timestamp) as a "cursor" instead of offset.

  Example: ?after=last_seen_id.

- Pros: Faster for large data, avoids missing/duplicate rows if new data is inserted.

- Cons: Cannot directly jump to page 50, harder to implement.

- Use case: Infinite scroll, real-time feeds (Twitter, Facebook).

### 🔹 3. Seek Pagination

- A variation of cursor-based, uses a WHERE clause with indexed column.

  Example: WHERE id > 101 LIMIT 10.

- Pros: Super fast on indexed columns.

- Cons: Needs stable sorting keys (usually primary key or timestamp).

### 🔹 4. Hybrid Pagination

- Mix of offset + cursor.

- Example: Use offset for first few pages, then switch to cursor for deep scroll.

### 🔹 5. Infinite Scroll (a UI pattern)

- Loads more data as user scrolls down.

- Usually backed by cursor/seek pagination in APIs.

- Pros: Seamless user experience.

- Cons: Hard to navigate to a specific page.

### 🔹 6. Numbered Pagination (Classic)

- UI shows page numbers (1, 2, 3, …).

- Backend may use offset-based to implement.

- Pros: Good for search results, where users may want page navigation.

- Cons: Bad performance on huge data.
