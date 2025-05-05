// ฟังก์ชันแยก IPFS hash จาก URL
export function extractIpfsHash(url: string): string | null {
  const match = url.match(/ipfs\/([^/]+)/);
  return match ? match[1] : null;
}
