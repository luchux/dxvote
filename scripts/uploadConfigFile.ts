const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

async function main() {
  let data = new FormData();
  data.append('file', fs.createReadStream('./src/config.json'));
  data.append(
    'pinataMetadata',
    JSON.stringify({
      name: `DXvote Config`,
      keyvalues: {
        type: 'dxvote-config',
      },
    })
  );
  await axios
    .post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      maxBodyLength: Number(Infinity),
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET_KEY,
      },
    })
    .then(function (response) {
      console.log(response.data);
      console.debug(`IPFS hash for dxvote config: ${response.data.IpfsHash}`);
    })
    .catch(function (error) {
      console.error(error);
    });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
