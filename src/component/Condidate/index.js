import { useContext, useEffect, useState } from "react";
import CondidateList from "./condidateList";
import { Col, Container, Row } from "react-bootstrap";

import { Web3Context } from '../context';



const Condidate = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [listCondid, setListCondid] = useState([])

    useEffect(() => {
        console.log('1')
        if (web3States.contract) {
            console.log('2')
            web3States.contract.methods.condidateList().call({ from: web3States.account }).then(res => {
                setListCondid(res)
            })
        }
    }, [web3States.contract])

    return (
        <>
            <Container>
                <Row dir="rtl">
                    {listCondid.length > 0 ?
                        listCondid.map((item, i) =>
                            <Col key={i} md={3} >
                                <CondidateList id={item['id']} name={item['name']} voteCount={item['voteCount']} />
                            </Col>
                        )
                        :
                        <Col className="text-center mt-2">
                            <i className="fa fa-spin fa-spinner fa-3x"></i>
                        </Col>
                    }
                </Row>
            </Container>
        </>
    )
}

export default Condidate;