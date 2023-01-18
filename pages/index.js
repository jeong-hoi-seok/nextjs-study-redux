import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import axios from 'axios'
import youtubeData from '../utils/youtube.json';
//components
import YoutubeItem from '../components/YoutubeItem'

const HomeBlock = styled.div`
	position: relative;
	min-height: 100vh;
	background-color: #212121;
	.itemWrap {
		display: flex;
		padding: 20px;
		overflow-x: hidden;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
`

export default function Home(props) {
	const {
		test,
	} = props;

	const [data, setData] = useState(youtubeData.items);

	// useEffect(() => {
	// 	let jsonData = {};

	// 	jsonData.part = 'snippet';
	// 	jsonData.chart = 'mostPopular';
	// 	jsonData.maxResults = 15;
	// 	jsonData.q = '뉴진스';
	// 	jsonData.type = 'video';
	// 	jsonData.regionCode = 'KR';
	// 	// jsonData.key = 'AIzaSyCl9q428oS1qbCfelcFFAsokHn05v7fp7A'
	// 	jsonData.key = 'AIzaSyBjXsZB1peOEH9qBNir5Z23xzIGaKTr_ss'

	// 	axios.get('https://www.googleapis.com/youtube/v3/search', {params: jsonData})
	// 	.then((res) => {
	// 		console.log(res)
	// 		setData(res.data.items);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})
	// }, []);

	return (
		<>
			<Head>
				<title>유튜브 테스트</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<HomeBlock>
					<div className='itemWrap'>
						{
							data && data.map((d,i) => (
								<YoutubeItem key={i} data={d}/>
							))
						}
					</div>
				</HomeBlock>
			</main>
		</>
	)
}
