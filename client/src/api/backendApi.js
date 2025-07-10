export async function searchVideos(query) {
  const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.items || [];
}
