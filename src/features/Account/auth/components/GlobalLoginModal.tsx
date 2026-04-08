import React, { useContext } from 'react'
import { Modal } from 'antd'
import SignUp from '../sign-up'
import { AuthContext } from '../context/authContext'

/**
 * Global Login Modal component.
 * Wraps the existing SignUp component into an Ant Design Modal.
 * It is managed through the AuthContext.
 */
const GlobalLoginModal = () => {
  const authContext = useContext(AuthContext)
  
  if (!authContext) return null
  
  const { isLoginModalOpen, setLoginModalOpen } = authContext

  return (
    <Modal
      open={isLoginModalOpen}
      onCancel={() => setLoginModalOpen(false)}
      footer={null}
      width={ width <= 840 ? '100%' : 650}
      centered
      destroyOnClose
      className="login-modal"
      bodyStyle={{ padding: 0 }}
    >
      <div className="overflow-hidden rounded-2xl">
         <SignUp isModal={true} />
      </div>
    </Modal>
  )
}

// Simple window size hook for the modal width logic if needed, 
// but SignUp already handles its internal Col spans.
const width = typeof window !== 'undefined' ? window.innerWidth : 1200

export default GlobalLoginModal
