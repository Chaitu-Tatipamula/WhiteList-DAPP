const {expect} = require('chai')
const {ethers} = require('hardhat')

describe('WhiteList', () => {
    let deploedContract;
    beforeEach(async()=>{
       
        const contract = await ethers.getContractFactory("WhiteList")
        deploedContract = await contract.deploy(10);
    })

    describe('Deployment', () => {

        it('Sets maximum number of whitelistings',async()=>{
            expect(await deploedContract.maxWhitelistings()).to.equal(10);
        })
        it('Initializes the whitelist to 0',async()=>{
            expect(await deploedContract.numOfWhitelistedAddresses()).to.equal(0)
        })
     
    })

    describe('Whitelisting', () => {
        it('check address through mapping', async()=>{
            // will give false, initially no one is in Whitelist
            expect(await deploedContract.whitelistedAddress('0x271a475513Fc38Bf44981a874Fbec7b3Fc61c471')).to.equal(false)
        })
        it('Add the address to the Whitelist ', async()=>{
            // add the signer to Whitelist 
            const tx = await deploedContract.addAddressToWhitelist();
            // wait for the transaction to complete
            await tx.wait()
            // now check the number of whitelisted addresses through the state variable it should be 1 now..!
            expect(await deploedContract.numOfWhitelistedAddresses()).to.equal(1)
        })
    })
})