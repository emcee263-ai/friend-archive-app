'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useEffect,useState} from 'react';
import {loadDB} from './store';

export function Brand(){return <Link href="/" className="brand">THE ARCHIVE</Link>}
export function TopNav({back='/dashboard'}){const router=useRouter(); return <nav className="app-nav"><button className="icon-button" onClick={()=>router.push(back)}>←</button><Brand/><span className="nav-spacer"/><Link className="nav-profile" href="/settings">A</Link></nav>}
export function Shell({children,spaceId='space-1'}){const path=usePathname(); const [db,setDb]=useState(null); useEffect(()=>setDb(loadDB()),[]); const nav=[['/dashboard','Home','⌂'],['/space/'+spaceId,'Space','✦'],['/memories','Memories','▣'],['/story','Story','◌'],['/music','Music','♪'],['/things','Things','◇'],['/bucket-list','List','✓'],['/games','Games','♧']]; return <div className="app-shell"><aside className="sidebar"><Brand/><div className="side-space"><span>SPACE</span><strong>{db?.spaces?.[0]?.name||'The Good Stuff'}</strong><small>{db?.spaces?.[0]?.type==='group'?'Group':'Pair'} space</small></div><div className="side-nav">{nav.map(([href,label,icon])=><Link key={href} className={path===href?'active':''} href={href}><span>{icon}</span>{label}</Link>)}</div><div className="side-bottom"><Link href="/achievements">Achievements</Link><Link href="/settings">Settings</Link></div></aside><main className="app-main">{children}</main><nav className="mobile-nav">{nav.slice(0,5).map(([href,label,icon])=><Link key={href} className={path===href?'active':''} href={href}><span>{icon}</span><small>{label}</small></Link>)}</nav></div>}
export function SectionHeader({eyebrow,title,children}){return <div className="section-head"><div><p className="hero-label">{eyebrow}</p><h1>{title}</h1></div>{children}</div>}
export function Toast({text,onClose}){useEffect(()=>{const t=setTimeout(onClose,2200);return()=>clearTimeout(t)},[onClose]); return <div className="toast">{text}</div>}
