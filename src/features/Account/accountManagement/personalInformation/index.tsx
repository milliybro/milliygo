import AccountLayout from '@/components/Layouts/Account/AccountLayout'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import PageHeader from '@/features/Account/components/PageHeader'
import AgreementForData from '@/features/Account/components/PersonalInformation/agreement'
import PersonalBirthDate from '@/features/Account/components/PersonalInformation/personal-birth-date'
import PersonalCitizenship from '@/features/Account/components/PersonalInformation/personal-citizenship'
import PersonalDisplayName from '@/features/Account/components/PersonalInformation/personal-display-name'
import PersonalEmail from '@/features/Account/components/PersonalInformation/personal-email'
import PersonalName from '@/features/Account/components/PersonalInformation/personal-name'
import PersonalSex from '@/features/Account/components/PersonalInformation/personal-sex'
import ProfileImage from '@/features/Account/components/PersonalInformation/profile-image'
import { Flex } from 'antd'
import { useTranslations } from 'next-intl'
import { useContext, useEffect, useState } from 'react'
import PersonalLastName from '../../components/PersonalInformation/personal-last-name'
import PersonalPhoneNumber from '../../components/PersonalInformation/personal-phone-number'

function PersonalInformationPage() {
  const t = useTranslations()

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('authState') || '{}')
    setUserInfo(dataUser?.userInfo)
  }, [])

  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    isAuthenticated: boolean

    login: (_user: object) => void
    logout: () => void
    userInfo: object
  }

  const { login: loginAction, logout } = authStore

  return (
    <AccountLayout
      breadCrumbTitle={t('personal-information.title')}
      breadCrumbHref="personal-information"
    >
      <Flex vertical gap={24}>
        <PageHeader
          title={t('personal-information.title')}
          description={t('personal-information.description')}
        />

        <Flex vertical>
          <ProfileImage userInfo={userInfo} setUserInfo={setUserInfo} loginAction={loginAction} />
          <PersonalName userInfo={userInfo} setUserInfo={setUserInfo} loginAction={loginAction} />
          <PersonalLastName
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loginAction={loginAction}
          />

          <PersonalDisplayName
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loginAction={loginAction}
          />
          <PersonalEmail userInfo={userInfo} setUserInfo={setUserInfo} loginAction={loginAction} />
          <PersonalPhoneNumber
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loginAction={loginAction}
          />

          <PersonalBirthDate
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loginAction={loginAction}
          />
          <PersonalCitizenship
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loginAction={loginAction}
          />
          <PersonalSex userInfo={userInfo} setUserInfo={setUserInfo} loginAction={loginAction} />
          <AgreementForData logout={logout} />
        </Flex>
      </Flex>
    </AccountLayout>
  )
}

export default PersonalInformationPage
