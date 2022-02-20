// Convenience script for checks
// installed HDWalletProvider, Web3

(async () => {
    const HDWalletProvider = require('@truffle/hdwallet-provider');
    const Web3 = require('web3')
    require('dotenv').config();

    const privateKey = process.env.PRIVATE_KEY || 'foo';
    const infuraKey = process.env.INFURA_KEY || 'foo';

    const maker = new HDWalletProvider(privateKey, "https://ropsten.infura.io/v3/" + infuraKey);
    const web3 = new Web3(maker);

    const userAddress = (await web3.eth.getAccounts())[0]
    console.log("userAddress:", userAddress)
    const balance = web3.utils.fromWei(await web3.eth.getBalance(userAddress))
    console.log("balance", balance)

    // todo: set constants
    const erc721Abi = [{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getRaribleV2Royalties","outputs":[{"components":[{"internalType":"address payable","name":"account","type":"address"},{"internalType":"uint96","name":"value","type":"uint96"}],"internalType":"struct LibPart.Part[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"tokenURI","type":"string"},{"components":[{"internalType":"address payable","name":"account","type":"address"},{"internalType":"uint96","name":"value","type":"uint96"}],"internalType":"struct LibPart.Part[]","name":"creators","type":"tuple[]"},{"components":[{"internalType":"address payable","name":"account","type":"address"},{"internalType":"uint96","name":"value","type":"uint96"}],"internalType":"struct LibPart.Part[]","name":"royalties","type":"tuple[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"internalType":"struct LibERC721LazyMint.Mint721Data","name":"data","type":"tuple"},{"internalType":"address","name":"to","type":"address"}],"name":"mintAndTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const erc721ContractAddress = "0xe4cdc02e1ed6d8e282caf10d60fd0f5653a27119"
    const erc721tokenId = "54888904155104025321824936791170013967408959726053725075918423955676487221249"

    let erc721Contract = new web3.eth.Contract(
          erc721Abi,
          erc721ContractAddress
    );
    const result = await erc721Contract.methods
        .ownerOf(erc721tokenId)
        .call()
    console.log("result: ", result);

    return null
})()
