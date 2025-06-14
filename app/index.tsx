import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import Email from '@/assets/svg/email-icon.svg'
import Lock from '@/assets/svg/lock-icon.svg'
import Logo from '@/assets/svg/logo.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { TextError } from '@/components/TextError'
import { LoginData, useAuth } from '@/hooks/useAuth'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Index() {
  const Router = useRouter()
  const Auth = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    if (!showError) return

    setTimeout(() => setShowError(false), 1500)
  }, [showError])

  const loginSchema = z.object({
    email: z.string({ required_error: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ required_error: 'A senha é obrigatória' })
  })

  async function login(data: LoginData) {
    try {
      setLoading(true)
      await Auth.login(data)
    } catch (error) {
      setErrorMessage('Erro ao fazer login')
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      }
      setShowError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50,
        marginHorizontal: 20
      }}
    >
      <Logo />
      <View
        style={{
          marginTop: 40,
          width: 300,
          height: 400,
          gap: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={login}
          validateOnBlur
          validationSchema={toFormikValidationSchema(loginSchema)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <>
              <View>
                <Input
                  placeholder="Email"
                  autoComplete="email"
                  icon={<Email />}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <TextError>{errors.email}</TextError>}
              </View>
              <View>
                <Input
                  placeholder="Senha"
                  autoComplete="password"
                  secureTextEntry
                  icon={<Lock />}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <TextError>{errors.password}</TextError>}
              </View>
              <Button loading={loading} text="Login" onPress={() => handleSubmit()} />
            </>
          )}
        </Formik>
        <Text
          style={{
            color: colors.text.default,
            textDecorationLine: 'underline',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
            fontSize: 17
          }}
          onPress={() => Router.push('/register')}
        >
          Registre-se
        </Text>
      </View>
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        action={{
          label: 'Fechar'
        }}
      >
        {errorMessage}
      </Snackbar>
    </View>
  )
}
