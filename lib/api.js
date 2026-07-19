const OPEN_LIBRARY_BASE = "https://openlibrary.org";
const COVERS_BASE = "https://covers.openlibrary.org/b/id";

function workIdFromKey(key) {
  if (!key) return null;
  return key.split("/").filter(Boolean).pop();
}

function coverUrl(coverId, size = "M") {
  return coverId ? `${COVERS_BASE}/${coverId}-${size}.jpg` : null;
}

/**
 * Popular / trending books, used on the home page.
 * Open Library's "subjects" endpoint doubles as a simple
 * "popular books" feed, ranked by their internal popularity score.
 */
export async function getPopularBooks(subject = "fiction", limit = 50) {
  const res = await fetch(
    `${OPEN_LIBRARY_BASE}/subjects/${subject}.json?limit=${limit}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to load popular books");
  const data = await res.json();
  return (data.works || []).map((w) => ({
    id: workIdFromKey(w.key),
    title: w.title,
    author: w.authors?.[0]?.name || "Unknown author",
    coverId: w.cover_id || null,
    coverUrl: coverUrl(w.cover_id),
    firstPublishYear: w.first_publish_year || null,
  }));
}

export async function searchBooks(query, limit = 24) {
  const res = await fetch(
    `${OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return (data.docs || []).map((d) => ({
    id: workIdFromKey(d.key),
    title: d.title,
    author: d.author_name?.[0] || "Unknown author",
    coverId: d.cover_i || null,
    coverUrl: coverUrl(d.cover_i),
    firstPublishYear: d.first_publish_year || null,
  }));
}

export async function getBookDetail(id) {
  const res = await fetch(`${OPEN_LIBRARY_BASE}/works/${id}.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to load book detail");
  const data = await res.json();

  let description = "No description available for this title yet.";
  if (typeof data.description === "string") {
    description = data.description;
  } else if (data.description?.value) {
    description = data.description.value;
  }

  const coverId = data.covers?.find((c) => c > 0) || null;

  return {
    id,
    title: data.title,
    description,
    coverId,
    coverUrl: coverUrl(coverId, "L"),
    subjects: (data.subjects || []).slice(0, 8),
  };
}
