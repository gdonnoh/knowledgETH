'use client';

const ETH_ADDRESS = '0x34385bbee2cc047c46e739ed456e79dd2b71912d';

export function DonationLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Copia l'indirizzo negli appunti
    navigator.clipboard.writeText(ETH_ADDRESS);
    
    // Apre un link a Etherscan o un wallet
    const etherscanUrl = `https://etherscan.io/address/${ETH_ADDRESS}`;
    window.open(etherscanUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={`https://etherscan.io/address/${ETH_ADDRESS}`}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[8px] opacity-20 hover:opacity-40 transition-opacity duration-200 font-mono tracking-tight"
      title="Copy ETH address"
    >
      donations
    </a>
  );
}

