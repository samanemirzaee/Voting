import { Button, Col, Toast, ToastContainer } from "react-bootstrap"
import { useState, useContext,useEffect } from 'react';
import Web3 from "web3";
import { Abi } from "../Abi";
import { Web3Context } from "../context";

const Connect = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [show, setShow] = useState(false);
    const [account, setAccount] = useState();
    const [message, setMessage] = useState("");

    const connectToWallet = async () => {
        let web3, contract;
        if (typeof window.ethereum !== "undefined") {
            let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(Web3.givenProvider);
            web3.eth.getChainId().then(res => {
                if (res == "3") {
                    setAccount(accounts[0])
                    contract = new web3.eth.Contract(Abi, "0x4C6Cbb58d9e7e866E0E6d6006d84cB79E8E3C95D")
                    contract.methods.owner().call({ from: accounts[0] }).then(res => {
               
                        setWeb3State({ web3: web3, contract: contract, account: accounts[0],isOwner:(res??"").toLowerCase()==(accounts[0]??"").toLowerCase() })
                    })

                } else {
                    setMessage("ropsten شبکه تستی مد نظر می باشد")
                    setShow(true)
                }
            })
        } else {
            setMessage("متامسک را نصب کنید")
            setShow(true)
        }
    }
    useEffect(()=>{
        let web3, contract;
        web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
        contract = new web3.eth.Contract(Abi, "0x4C6Cbb58d9e7e866E0E6d6006d84cB79E8E3C95D")
        setWeb3State({ web3: web3, contract: contract, account: null, isOwner: false })
        
    }
    ,[])
    return (
        <>
            <Col xs={6}>
                <ToastContainer className="p-3" position="top-center">
                    <Toast onClose={() => setShow(false)}
                        show={show} delay={5000} autohide>
                        <Toast.Header className="text-white bg-danger">
                            <strong className="ms-auto">خطا</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-light">{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
            <Button onClick={connectToWallet} value="success">
                {account ? (account.substring(0, 4) + '...' + account.slice(-4)) : 'اتصال به کیف پول'}
            </Button>
        </>
    );
}

export default Connect