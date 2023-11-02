"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Gallery from '@/components/gallery'
import Menu from '@/components/menu'
import 'primeicons/primeicons.css';
import StockHistory from '@/service/StockHistory'
import StockOption from '@/service/StockOption'
export default function Page() {
  const [age, setAge] = useState('');
  const [responseData, setResponseData] = useState(null); // 追蹤後端回傳的資料
  const [files, setFiles] = useState([]);
  const [showstock, setShowstock] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null); // 添加选中的城市状态
  const [historydata, setHistoryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/machinelearning');
        console.log(response);
      } catch (error) {
        console.error('發生錯誤：', error);
      }
    };
    fetchData(); // Call the function when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts


  // 處理輸入框變化
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  // 處理提交表單
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const stockId = selectedStock
      const response = await axios.post(`http://localhost:8000/machinelearning/stock/${stockId}/predict`); // 將 age 封裝成物件
      console.log(response)
      const src:any = `data:image/png;base64,${response.data.image}`;
      setResponseData(src); // 設定後端回傳的資料

    } catch (error) {
      console.error(error);
      // Handle error
    }
  };


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmitPhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    console.log(formData);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('檔案上傳成功');
      } else {
        console.error('檔案上傳失敗');
      }
    } catch (error) {
      console.error('發生錯誤：', error);
    }
  };
  const handlestockshow = (e) => {
    e.preventDefault();
    setShowstock(!showstock)
  }

  // 預測股價
  const predictStock = async () => {
    console.log(selectedStock)
    const stockId = selectedStock
    try {
      const response = await axios.post(`http://localhost:8000/machinelearning/stock/${stockId}`, {
        mode: 'no-cors',
      }); 
      setHistoryData(response)
    } catch (error) {
      console.error('發生錯誤：', error);
    }
  }

  return (
    <main>
      {/* US stock */}
      <div className='headerWrapper mb-8 h-screen'>
        <Header/>
        <img className="mainPhoto"src="/mainphoto.jpg"/>
      </div>
      <Menu/>
      <div className='flex mb-8 mt-24 justify-center gap-24'>
        <div className='flex items-center font-bold text-3xl text-white'>預測未來美股股價</div>
      </div>
      <div className='flex items-center mb-24 container'>
        <div className='w-1/2 flex justify-center'>
          <img src="/stock.jpg" className='bg-white w-96 h-96 rounded-3xl'/>
        </div>
        <div className='w-1/2 flex justify-center'>
          <div className='block'>
            <div className='text-2xl font-bold pb-4'>
              predict the US stock price
            </div>
            <div className='pb-4 flex gap-4'>
              <StockOption selectedStock={selectedStock} setSelectedStock={setSelectedStock}/>
              <button className='p-2 bg-color-3 text-color-1 rounded-xl'onClick={predictStock}>預測</button>
            </div>
            {/* <form onSubmit={handleSubmit} className="pb-8">
              <input
                type="text"
                placeholder="輸入年齡"
                value={age}
                onChange={handleAgeChange}
                />
              <button type="submit" className='p-2 bg-color-3 text-color-1 rounded-xl'>start</button>
            {responseData && (
              <div className=''>
                <button className='p-2 bg-color-3 text-color-1 rounded-xl' onClick={handlestockshow}>{showstock ? 'hide':'show'}</button>
              </div>
            )}
            </form> */}
            <div className='flex justify-center bg-color-3'>
              <StockHistory historydata={historydata} selectedStock={selectedStock}/>
            </div>
          </div>
        </div>
      </div>     
      {/* {showstock && (
        <div className="flex pb-8 justify-center items-center">
          <img src={responseData}></img>
        </div>
      )} */}
      <div className='flex mb-8 mt-24 justify-center gap-24'>
        <div className='flex items-center font-bold text-3xl text-white'>創造你的專屬圖片</div>
      </div>
      <div className='flex justify-center'>
        <div className='flex mb-8 justify-center gap-24'>
          <div className='flex justify-center'>
            <Gallery/>
          </div>
          <div className='flex items-center font-bold text-3xl text-white'>最新生成圖片</div>
        </div> 
      </div>

      {/* change photo style */}
      <div className='flex items-center mb-24 container'>
        <div className='w-1/2 flex justify-center'>
          <img src="/draw.jpg" className='bg-white w-96 h-96 rounded-3xl'/>
        </div>
        <div className='w-1/2 flex justify-center'>
          <div className='block'>
            <div className='text-2xl font-bold pb-4'>
              upload and generate images in different styles
            </div>
            <form onSubmit={handleSubmitPhoto}>
              <input type="file" className='p-2' onChange={handleFileChange} multiple />
              <button type="submit" className='p-2 bg-color-3 text-color-1 rounded-xl'>上傳</button>
            </form>
          </div>
        </div>
      </div>
      {/* change voice style */}
      <div className='flex mb-8 mt-24 justify-center gap-24'>
        <div className='flex items-center font-bold text-3xl text-white'>AI歌手</div>
      </div>
      <div className='flex items-center mb-24 container'>
        <div className='w-1/2 flex justify-center'>
          <img src="/music.jpg" className='bg-white w-96 h-96 rounded-3xl'/>
        </div>
        <div className='w-1/2 flex justify-center'>
          <div className='block'>
            <div className='text-2xl font-bold pb-4'>
              Turn your voice into someone else's
            </div>
            <audio controls className='mb-4'>
              <source src=".ogg" type="audio/ogg"></source>
              <source src="CHOU.mp3" type="audio/mpeg"></source>
            </audio>
            <form onSubmit={handleSubmitPhoto}>
              <input type="file" onChange={handleFileChange} multiple />
              <button type="submit" className='p-2 bg-color-3 text-color-1 rounded-xl'>上傳</button>
            </form>
          </div>
        </div>
      </div>
      {/* recognize your face*/}
      <div className='flex mb-8 mt-24 justify-center gap-24'>
        <div className='flex items-center font-bold text-3xl text-white'>人臉辨識</div>
      </div>
      <div className='flex items-center mb-24 container'>
        <div className='w-1/2 flex justify-center'>
          <img src="/people.jpg" className='bg-white w-96 h-96 rounded-3xl'/>
        </div>
        <div className='w-1/2 flex justify-center'>
          <div className='block'>
            <div className='text-2xl font-bold pb-4'>
              Recognize everyone's face
            </div>
            <form onSubmit={handleSubmitPhoto}>
              <input type="file" onChange={handleFileChange} multiple />
              <button type="submit" className='p-2 bg-color-3 text-color-1 rounded-xl'>上傳</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
