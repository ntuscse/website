'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function Home() {

  const [data, setData] = useState({
      "id":"65d35d5b86e7049992adcd43",
      "logo":{
        "id":"65d35d4f86e7049992adcd3a",
        "filename":"2024-02-14_185630.png",
        "mimeType":"image/png","filesize":219695,"width":640,"height":480,
        "createdAt":"2024-02-19T13:53:19.526Z","updatedAt":"2024-02-19T13:53:19.526Z",
        "url":"http://localhost:3003/media/2024-02-14_185630.png"
      },
      "NavItems":[{
        "label":"Hel",
        "subnavItems":[
          {"subnavTitle": "Hellow", "url": "/"},
          {"subnavTitle": "world", "url": './'}
        ],
        "id":"65d35d56c35f6d35cc90527e"
      }],
      "_status":"published","createdAt":"2024-02-19T13:53:31.941Z",
      "updatedAt":"2024-02-19T13:55:46.205Z","status":"published"
  })
  /*
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:3003/api/navbars/65d35d5b86e7049992adcd43?draft=true')
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className="navbar bg-base-100 px-8">
        <div className="flex-1">
          <Image src={data.logo.url} width={40} height={40} alt="SCSE logo" />
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            {data.NavItems.map(navItem => (
              <li> <NavItem navData={navItem} /> </li>
            ))}
          </ul>
        </div>
      </div>
  </main>
  );
}

const NavItem = ({navData}) => {
  return (
      <details>
        <summary>
          {navData.label}
        </summary>
        { navData.subnavItems && <ul className="p-2 bg-base-100 rounded-t-none">
          {navData.subnavItems.map(subNavData =>
            (
              <li><a>{subNavData.subnavTitle}</a></li>
            )
          )}
          </ul>
        }
      </details>
  )
}
