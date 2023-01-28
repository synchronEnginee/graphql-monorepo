import { UiSchema } from '@rjsf/utils'

import { UserProperties } from '../CreateUserForm'

export const CreateUserFormUI: { [K in keyof UserProperties]: UiSchema } = {
  id: {
    'ui:widget': 'hidden',
  },
  name: {
    'ui:autofocus': true,
  },
}
