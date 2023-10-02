import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState, useRef } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { CONTRACT_ADRESS, abi } from '@/consstants'

export default function Home() {
  const [walletConnected,setWalletConnected] = useState(false);
  const [numOfWhitelistedAddresses,setNumOfWhitelistedAddresses] = useState("0")
  const [addressWhitelisted, setAddressWhitelisted] = useState(false)
  const [loading, setLoading] = useState(false)
  const web3ModalRef = useRef();

  const getProviderOrSigner = async(needSigner=false)=>{
    
    try {

          const provider = new ethers.BrowserProvider(window.ethereum);
          const {chainId} = await provider.getNetwork()
          if(chainId != "11155111"){
            window.alert("Change the network to Sepolia testnet");
            throw new Error("Change the network")
          }

          if(needSigner){
            const signer =await provider.getSigner();
            return signer;
          }
          return provider;
        
      } catch (error) {
          console.error(error);   
      }

    }

    const getNumOfAddressWhitelisted = async()=>{
      
      try {
        
          const provider = await getProviderOrSigner();
          const contract = await new ethers.Contract(
            CONTRACT_ADRESS,
            abi,
            provider
          )
          let _numOfAddressWhitelisted = await contract.numOfWhitelistedAddresses();
          _numOfAddressWhitelisted = _numOfAddressWhitelisted.toString()
          // console.log(_numOfAddressWhitelisted);
          setNumOfWhitelistedAddresses(_numOfAddressWhitelisted);

        
      } catch (error) {
            console.error(error);
      }

    }


    const checkAddressWhitelisted = async()=>{
      try {

          const signer = await getProviderOrSigner(true);
          const contract = await new ethers.Contract(
            CONTRACT_ADRESS,
            abi,
            signer
          )
          const address = await signer.getAddress()
          let _addressWhitelisted = await contract.whitelistedAddress(address);
          console.log(_addressWhitelisted);
          setAddressWhitelisted(_addressWhitelisted)
        
      } catch (error) {
            console.error(error);
      }
    }

    const addAddressToWhitelistContract = async()=>{
      try {

        const signer = await getProviderOrSigner(true);
        const contract = await new ethers.Contract(
          CONTRACT_ADRESS,
          abi,
          signer
        )
        
        const transaction = await contract.addAddressToWhitelist();
        setLoading(true);
        await transaction.wait();
        setLoading(false);
        setAddressWhitelisted(true);
        
       

       
      
    } catch (error) {
          console.error(error);
    }

    }

    const renderButton = ()=>{

      if(walletConnected){
        if(addressWhitelisted){
          return (
            <div className={styles.description}>Thanks for joining..</div>
          )
        }else if(loading){
          return (
            <button className={styles.button}>loading..</button>
          )
        }
        else{
          return (
            <button className={styles.button} onClick={addAddressToWhitelistContract}>Join WhiteList</button>
          )
        }
        
      }else{
        return (
          <button className={styles.button} onClick={connectWallet}>
            Connect to Wallet
          </button>
        )
      }

     

    }




  const connectWallet = async()=>{
    try {
      await getProviderOrSigner();

      setWalletConnected(true);
      getNumOfAddressWhitelisted()
      checkAddressWhitelisted();
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(()=>{
   
      if(!walletConnected){
        web3ModalRef.current = new Web3Modal({
          network : "sepolia",
          providerOptions : {},
          disableInjectedProvider : false 
        })
        connectWallet()
      }
  },[walletConnected])

  
  return (
    <>
      <Head>
         <meta name="Dapp" content="Whitelist-DAPP" />
         <title>Document</title>
      </Head>
      <div className={styles.main}>
          <div>
          <h1 className={styles.title}>WhiteList-DAPP</h1>
          <div className={styles.description}>
             Hey This is a WhiteListed-DAPP..!
           </div>
          <div className={styles.description}>
              {numOfWhitelistedAddresses} have already joined the Whitelist
           </div>
           {renderButton( )}
          
          </div>    
          <div> 
              <img className={styles.image} src='./crypto-devs.svg' />
          </div>   
      </div>
      <div className={styles.footer}>
        made by someone with something
      </div>
    </>
  )
}
