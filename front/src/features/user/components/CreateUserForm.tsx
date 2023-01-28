import _ from 'lodash'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'

import jsonSchema from '../../../../json-schema.json'
import { CreateUserFormUI } from './form-config/CreateUserFormUI'

type Props = {}

const requireFormKey = ['id', 'name'] as const
type requireFormKeyType = typeof requireFormKey[number]
export type DefinitionType = typeof jsonSchema['definitions']
export type DefinitionsKey = keyof DefinitionType
export type UserProperties = Pick<
  DefinitionType['User']['properties'],
  requireFormKeyType
>

const CreateUserForm = (props: Props) => {
  const schema = jsonSchema

  // schemaのdefinitionsを不要なキーを捨てて変換して、フォーム自動生成に渡してあげる
  _.update(schema, 'definitions.User.properties', () =>
    _.pick(schema.definitions.User.properties, requireFormKey),
  )

  return (
    <Form
      schema={schema as RJSFSchema}
      validator={validator}
      uiSchema={CreateUserFormUI}
    />
  )
}

export default CreateUserForm
