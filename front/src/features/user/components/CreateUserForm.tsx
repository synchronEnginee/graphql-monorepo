import _ from 'lodash'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import jsonSchema from '../../../../json-schema.json'

type Props = {}

const CreateUserForm = (props: Props) => {
  const schema = jsonSchema
  type a = typeof jsonSchema['definitions']
  type key = keyof a
  type b = a['User']['properties']

  // schemaのdefinitionsを不要なキーを捨てて変換して、フォーム自動生成に渡してあげる
  _.update(schema, 'definitions.User.properties', () =>
    _.pick(schema.definitions.User.properties, ['id', 'name']),
  )

  return <Form schema={schema as RJSFSchema} validator={validator} />
}

export default CreateUserForm
