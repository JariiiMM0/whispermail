import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [subj, setSubj] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = async () => {
    if (!email || !msg) { setError('Tayta sahkoposti ja viesti.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Tarkista sahkoposti.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientEmail: email, message: msg, subject: subj }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError('Jokin meni pieleen.');
    } catch(e) { setError('Jokin meni pieleen.'); }
    setLoading(false);
  };

  return (<>
    <Head>
      <title>WhisperMail</title>
      <link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,400&family=DM+Mono:wght@300;400&display=swap' rel='stylesheet' />
    </Head>
    <div className='root'>
      <header>
        <div className='logo'>WhisperMail</div>
        <div className='tag'>laheta viesti anonyymisti</div>
      </header>
      <main>
        <h1>Onko sinulla jotain sanottavaa?</h1>
        <p>Laheta viesti kenelle tahansa — he eivat tiedaa kuka sen lahetti.</p>
        <div className='card'><div className='inner'>
          <div className='f'><label>Vastaanottajan sahkoposti</label><input type='email' placeholder='joku@example.com' value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className='f'><label>Aihe (valinnainen)</label><input type='text' placeholder='Sinulle on viesti...' value={subj} onChange={e=>setSubj(e.target.value)} /></div>
          <div className='f'><label>Viesti</label><textarea rows={6} maxLength={2000} placeholder='Kirjoita viestisi...' value={msg} onChange={e=>setMsg(e.target.value)} /></div>
          {error&&<div className='err'>{error}</div>}
          <button className={loading?'btn dis':'btn'} onClick={send} disabled={loading}>
            {loading?<span className='spin'/>:<><span>Laheta anonyymisti</span><span className='pr'>1 euro</span></>}
          </button>
          <div className='gu'>Nimesi ei koskaan paljastu &middot; Stripe &middot; Toimitetaan heti</div>
        </div></div>
      </main>
    </div>
    <style jsx global>{`*{box-sizing:border-box;margin:0;padding:0}body{background:#080a0f;color:#e8e0d4;font-family:'DM Mono',monospace;min-height:100vh}`}</style>
    <style jsx>{`
      .root{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:0 1.5rem 4rem}
      header{width:100%;max-width:640px;text-align:center;padding:3rem 0 1rem;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:3rem}
      .logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;letter-spacing:.2em;color:#c9a96e}
      .tag{font-size:.6rem;letter-spacing:.3em;color:rgba(255,255,255,.25);text-transform:uppercase;margin-top:.4rem}
      main{width:100%;max-width:640px;display:flex;flex-direction:column;gap:1.5rem}
      h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3rem);font-weight:300;color:#f0e8dc;text-align:center}
      p{font-size:.78rem;line-height:1.8;color:rgba(255,255,255,.4);text-align:center}
      .card{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.08);border-radius:2px}
      .inner{padding:2rem;display:flex;flex-direction:column;gap:1.2rem}
      .f{display:flex;flex-direction:column;gap:.4rem}
      label{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.3)}
      input,textarea{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:2px;color:#e8e0d4;font-family:'DM Mono',monospace;font-size:.82rem;padding:.8rem 1rem;outline:none;resize:none;width:100%;transition:border-color .2s}
      input:focus,textarea:focus{border-color:rgba(201,169,110,.4)}
      input::placeholder,textarea::placeholder{color:rgba(255,255,255,.15)}
      .err{background:rgba(220,60,60,.1);border:1px solid rgba(220,60,60,.3);border-radius:2px;padding:.7rem 1rem;font-size:.72rem;color:#ff9090}
      .btn{width:100%;background:linear-gradient(135deg,#c9a96e,#a07840);border:none;border-radius:2px;color:#080a0f;font-family:'DM Mono',monospace;font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;padding:1rem;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:opacity .2s}
      .btn:hover{opacity:.88}
      .dis{opacity:.5;cursor:not-allowed;justify-content:center}
      .pr{background:rgba(0,0,0,.2);padding:.2rem .6rem;border-radius:2px}
      .spin{width:16px;height:16px;border:2px solid rgba(0,0,0,.2);border-top-color:#080a0f;border-radius:50%;animation:sp .7s linear infinite;display:inline-block}
      @keyframes sp{to{transform:rotate(360deg)}}
      .gu{text-align:center;font-size:.6rem;letter-spacing:.06em;color:rgba(255,255,255,.2)}
    `}</style>
  </>);
}