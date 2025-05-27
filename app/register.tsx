import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import Email from '@/assets/svg/email-icon.svg'
import Lock from '@/assets/svg/lock-icon.svg'
import User from '@/assets/svg/user-icon.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { TextError } from '@/components/TextError'
import { RegisterData, useAuth } from '@/hooks/useAuth'
import { Formik } from 'formik'
import { Text, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Register() {
  const Auth = useAuth()

  const registerSchema = z.object({
    name: z.string({ required_error: 'O nome é obrigatório' }),
    email: z.string({ required_error: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ required_error: 'A senha é obrigatória' }),
    password_confirmation: z.string({ required_error: 'A confirmação de senha é obrigatória' })
  })

  async function register(data: RegisterData) {
    Auth.login(data)
  }

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          marginTop: 40,
          width: 300,
          height: 400,
          gap: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 30, paddingBottom: 30 }}>
          Registre-se agora!
        </Text>
        <Formik
          initialValues={{ name: '', email: '', password: '', password_confirmation: '' }}
          onSubmit={register}
          validateOnBlur
          validationSchema={toFormikValidationSchema(registerSchema)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <>
              <View>
                <Input
                  placeholder="Nome"
                  autoComplete="name"
                  icon={<User />}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name && errors.name && <TextError>{errors.name}</TextError>}
              </View>
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
                  autoComplete="new-password"
                  icon={<Lock />}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.name && errors.name && <TextError>{errors.name}</TextError>}
              </View>
              <View>
                <Input
                  placeholder="Confirme sua senha"
                  autoComplete="new-password"
                  icon={<Lock />}
                  onChangeText={handleChange('password_confirmation')}
                  onBlur={handleBlur('password_confirmation')}
                  value={values.password_confirmation}
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <TextError>{errors.password_confirmation}</TextError>
                )}
              </View>
              <Button onPress={() => handleSubmit()}>
                <Text
                  style={{
                    color: colors.text.contrast,
                    fontFamily: fontFamily.medium,
                    fontSize: 20
                  }}
                >
                  Registrar
                </Text>
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  )
}
