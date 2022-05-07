import Link from 'next/link'

const PasswordReset=()=>{
    return (
        <section className='auth_page'>
            <main className="auth_card_wrapper">
                <section className='auth_page_main'>
                    <h1 className='auth_page_header'>Reset Password</h1>
                    <form action="/" className='auth_form'>
                        <div className='form_field'>
                            <label htmlFor='email'>Email</label>
                            <input required={true} type='email' name='email'/>
                        </div>

                        <button className='btn_primary'>Reset!</button>
                    </form>
                </section>
                <section className='auth_page_secondary'>

                </section>
            </main>
        </section>
    )
}
export default PasswordReset