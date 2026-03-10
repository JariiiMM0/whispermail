import Head from 'next/head';
import { useRouter } from 'next/router';
export default function Success() {
  const r = useRouter();
  return (<>
    <Head><title>Viesti lahetetty</title><link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300&family=DM+Mono:wght@300;400&display=swap' rel='stylesheet' /></Head>
    <div className='root'><div className='card'>
      <div className='icon'>&#10003;</div>
      <h1>Viesti lahetetty!</h1>
      <p>Viestisi on matkalla. Vastaanottaja ei tiedaa kuka sen lahetti.</p>
      <button onClick={()=>r.push('/')}>Laheta uusi viesti</button>
    </div></div>
    <style jsx global>{`*{box-sizing:border-box;margin:0;padding:0}body{background:#080a0f;color:#e8e0d4;font-family:'DM Mono',monospace}`}</style>
    <style jsx>{`
      .root{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
      .card{text-align:center;max-width:400px;padding:3rem 2rem;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.08);border-radius:2px;display:flex;flex-direction:column;align-items:center;gap:1rem}
      .icon{font-size:3rem;color:#7dd87f;animation:fl 3s ease-in-out infinite}
      @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      h1{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:#a8e6b0}
      p{font-size:.75rem;color:rgba(255,255,255,.4);line-height:1.7}
      button{background:transparent;border:1px solid rgba(255,255,255,.15);border-radius:2px;color:rgba(255,255,255,.5);font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;padding:.7rem 1.2rem;cursor:pointer;transition:all .2s}
      button:hover{border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.8)}
    `}</style>
  </>);
}