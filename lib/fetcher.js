export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return res.json();
};

export const SWR_CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateIfStale: true,
  dedupingInterval: 60000, // 1 minute basic cache deduping
};
