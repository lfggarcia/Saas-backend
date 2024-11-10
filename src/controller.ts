import {AppsController} from "./apps/apps.controller";
import {AuthController} from "./auth/auth.controller"
import {AliasesController} from "./catalogs/controllers/aliases.controller"
import {ComponentTypesController} from "./catalogs/controllers/component-types.controller"
import {DefaultTokensController} from "./catalogs/controllers/default-tokens.controller"
import {FieldTypesController} from "./catalogs/controllers/field-types.controller"
import {PlansController} from "./catalogs/controllers/plans.controller"
import {RolesController} from "./catalogs/controllers/roles.controller"
import {StatusesController} from "./catalogs/controllers/statuses.controller"
import {TokenGroupAliasesController} from "./catalogs/controllers/token-group-aliases.controller"
import {TokenGroupsController} from "./catalogs/controllers/token-groups.controller"
import {ValidationTypesController} from "./catalogs/controllers/validation-types.controller"
import {ComponentsController} from "./components/components.controller"
import {CustomTokensController} from "./custom-tokens/custom-tokens.controller"
import {FeatureVersionsController} from "./feature-versions/feature-versions.controller"
import {FeaturesController} from "./features/features.controller"
import {FormFieldValidationsController} from "./form-field-validations/form-field-validations.controller"
import {FormFieldsController} from "./form-fields/form-fields.controller"
import {GlobalComponentsController} from "./global-components/global-components.controller"
import {GlobalStyleVariantsController} from "./global-style-variants/global-style-variants.controller"
import {GlobalStylesController} from "./global-styles/global-styles.controller"
import {LanguagesController} from "./i18n/languages.controller"
import {TranslationValuesController} from "./i18n/translation-values.controller"
import {TranslationKeysController} from "./i18n/translation-keys.controller"
import {ReducerActionsController} from "./reducer-actions/reducer-actions.controller"
import {ReducersController} from "./reducers/reducers.controller"
import {ScreenComponentsController} from "./screen-components/screen-components.controller"
import {ScreenVersionsController} from "./screen-versions/screen-versions.controller"
import {ScreensController} from "./screens/screens.controller"
import {StoresController} from "./stores/stores.controller"
import {ThemeTokensController} from "./theme-tokens/theme-tokens.controller"
import {UsersController} from "./users/users.controller"
import {ThemesController} from "./themes/themes.controller"

export default [
	AppsController,
	AuthController,
	AliasesController,
	ComponentTypesController,
	DefaultTokensController,
	FieldTypesController,
	PlansController,
	RolesController,
	StatusesController,
	TokenGroupAliasesController,
	TokenGroupsController,
	ValidationTypesController,
	ComponentsController,
	CustomTokensController,
	FeatureVersionsController,
	FeaturesController,
	FormFieldValidationsController,
	FormFieldsController,
	GlobalComponentsController,
	GlobalStyleVariantsController,
	GlobalStylesController,
	LanguagesController,
	TranslationValuesController,
	TranslationKeysController,
	ReducerActionsController,
	ReducersController,
	ScreenComponentsController,
	ScreenVersionsController,
	ScreensController,
	StoresController,
	ThemeTokensController,
	UsersController,
	ThemesController
]