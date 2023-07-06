import React, { useState } from 'react';
import Moralis from 'moralis';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>NFT Metadata Fetcher</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>Contract Address:</label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>NFT ID:</label>
        <input
          type="text"
          value={tokenIdNft}
          onChange={(e) => setTokenIdNft(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <button
        onClick={fetchMetadata}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Fetch Metadata
      </button>
      {metadata && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Metadata:</h3>
          <img src={nftImage} alt="NFT" style={{ maxWidth: '300px', marginBottom: '10px' }} />
          <p>
            <span style={{ fontWeight: 'bold' }}>Name:</span> {metadata.name}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Token Type:</span> {metadata.token_type}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>ID:</span> {metadata.id}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Description:</span> {metadata.description}
          </p>
        </div>
      )}
      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Error:</span> {error}
        </p>
      )}
    </div>
  );
};

export default NFTMetadataFetcher;