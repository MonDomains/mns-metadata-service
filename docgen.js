const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.ENV || 'local'; // local/prod
const SERVER_URL =
  ENV === 'local' ? `http://localhost:${PORT}` : `https://${HOST}`;

const outputFile = './src/assets/doc_output.json';
const endpointsFiles = ['./src/endpoint.ts'];

const doc = {
  info: {
    version: '0.0.1-alpha.1',
    title: 'MNS Metadata Service',
    description: 'Set of endpoints to query MNS metadata and more',
    contact: 'support@monadns.com',
    license: 'MIT License',
    x_logo: {
      url: './src/assets/logo.svg',
      backgroundColor: '#FFFFFF',
    },
  },
  host: SERVER_URL,
  definitions: {
    AvatarMetadata: {
      $uri: 'MNS name of avatar holder',
      is_owner: 'Ownership verification of NFT',
      host_meta: {
        chain_id: 'Chain ID where NFT resides',
        namespace: 'Type of NFT contract',
        contract_address: 'Contract address of NFT',
        token_id: 'Token ID of NFT',
        reference_url:
          'Marketplace URL of NFT',
        },
        $name: 'Name of NFT',
        $description:
          "Description of NFT",
        $attributes: 'Attributes of NFT',
        $image: 'Image data/URL of NFT',
        image_url: 'Image data/URL of NFT',
        image_data: 'Image data of NFT',
        background_color: 'Background color of NFT',
        youtube_url: 'Youtube URL of NFT'
    },
    MNSMetadata: {
      $name: 'MNS name',
      $description: 'Short MNS name description',
      $attributes: 'Custom traits about MNS',
      $name_length: 'Character length of MNS name',
      $url: 'MNS App URL of the name',
      $version: 'MNS NFT version',
      $background_image: 'Origin URL of avatar image',
      $image_url: 'URL of MNS NFT image',
    },
    contractAddress: '0x01BeCD733ea490CCDa8B5Caa97381E67BFA5249D',
    mnsName: 'nick.mon',
    tokenId: '4221908525551133525058944220830153...',
    networkName: {
      description: 'Name of the chain to query for.',
      '@enum': ['monad', 'monad-testnet'],
    },
  },
  components: {
    examples: {
      AvatarMetadata: {
        $uri: 'matoken.mon',
        is_owner: true,
        host_meta: {
          chain_id: 1,
          namespace: 'erc721',
          contract_address: '0x31385d3520bced94f77aae104b406994d8f2168c',
          token_id: '9421',
          reference_url:
            'https://opensea.io/assets/0x31385d3520bced94f77aae104b406994d8f2168c/9421',
        },
        $name: 'BASTARD GAN PUNK V2 #9421',
        $description:
          "FOR THE CHANCES\nI HAVEN'T GOT A BURIAL IN MY ARMS\nAND I'VE HAD ENOUGH\nTIME IS NOW\nIT'S TIME\nI'VE GOT NOTHING TO PROVE\nI'VE GOT NOTHING TO LOSE\n",
        $attributes: [
          {
            trait_type: 'HYPE TYPE',
            value: 'CALM AF (STILL)',
          },
          {
            trait_type: 'BASTARDNESS',
            value: 'FOMBOI BASTARD',
          },
          {
            trait_type: 'TYPE',
            value: 'LARGE',
          },
        ],
        image:
          'https://ipfs.io/ipfs/QmRagxjj2No4T8gNCjpM42mLZGQE3ZwMYdTFUYe6e6LMBG',
      },
      MNSMetadata: {
        $name: 'nick.mon',
        $description: 'nick.mon, an MNS name.',
        $attributes: [
          {
            trait_type: 'Created Date',
            display_type: 'date',
            value: null,
          },
          {
            trait_type: 'Length',
            display_type: 'number',
            value: 4,
          },
          {
            trait_type: 'Registration Date',
            display_type: 'date',
            value: 1580803395000,
          },
          {
            trait_type: 'Expiration Date',
            display_type: 'date',
            value: 1698131707000,
          },
        ],
        name_length: 4,
        url: 'https://dapp.monadns.com/name/nick.mon',
        version: 0,
        background_image:
          'https://metadata.monadns.com/monad/avatar/nick.mon',
        image_url:
          'https://metadata.monadns.com/monad/0x01BeCD733ea490CCDa8B5Caa97381E67BFA5249D/0x5d5727cb0fb76e4944eafb88ec9a3cf0b3c9025a4b2f947729137c5d7f84f68f/image',
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
