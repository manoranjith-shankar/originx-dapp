import React, { useState } from 'react';
import Moralis from 'moralis';
//0xD0664568C474cebf15a8bA5DBe61b8A1475aBB78

const NFTMetadataFetcher = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenIdNft, setTokenIdNft] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [nftImage, setNftImage] = useState('');
  const [error, setError] = useState(null);

  const fetchMetadata = async () => {
    await Moralis.start({
      apiKey: "3n9ve0Gtkrtcx4WAaessSXqWddDgv9LeEGjkUwpIRYRbGE0UNgB441XDlTArgcia",
    });

    try {
      const response = await Moralis.EvmApi.nft.getNFTMetadata({
        chain: "0x13881",
        format: "decimal",
        normalizeMetadata: true,
        mediaItems: false,
        address: contractAddress,
        tokenId: tokenIdNft
      });

      const m = response.toJSON()
      const normalized_metadata = m.normalized_metadata;
      const image = normalized_metadata.image;
      const ipfsGateway = 'https://ipfs.io/ipfs/';
      const mainImageLink = ipfsGateway + image.replace('ipfs://', '');

      setMetadata(m);
      setNftImage(mainImageLink);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setMetadata(null);
    }
  };

  return (
    <div>
      <h2>NFT Metadata Fetcher</h2>
      <div>
        <label>Contract Address:</label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <div>
        <label>NFT ID:</label>
        <input
          type="text"
          value={tokenIdNft}
          onChange={(e) => setTokenIdNft(e.target.value)}
        />
      </div>
      <button onClick={fetchMetadata}>Fetch Metadata</button>
      {metadata && (
        <div>
          <h3>Metadata:</h3>
          <img src={nftImage} alt="NFT" />
          <p>Name: {metadata.name}</p>
          <p>Token Type: {metadata.token_type}</p>
          <p>ID: {metadata.id}</p>
          <p>Description: {metadata.description}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default NFTMetadataFetcher;