

function Nav({setSession}) {
  return (
    <div className="flex justify-between">
        <h1 className='text-5xl'>EventLite</h1>
        <div className="p-2">
          <a className="btn" onClick={()=>{}}>Login</a>
          <a className="btn">Sign Up</a>
          <a className="btn" onClick={()=>{setSession(null)}}>Log Out</a>
        </div>
    </div>
  )
}

export default Nav