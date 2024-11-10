import { AppsService } from "./apps/apps.service";
import { AuthService } from "./auth/auth.service";
import { AliasesService } from "./catalogs/services/aliases.service";
import { ComponentTypesService } from "./catalogs/services/component-types.service";
import { DefaultTokensService } from "./catalogs/services/default-tokens.service";
import { FieldTypesService } from "./catalogs/services/field-types.service";
import { PlansService } from "./catalogs/services/plans.service";
import { RolesService } from "./catalogs/services/roles.service";
import { StatusesService } from "./catalogs/services/statuses.service";
import { TokenGroupAliasesService } from "./catalogs/services/token-group-aliases.service";
import { TokenGroupsService } from "./catalogs/services/token-groups.service";
import { ValidationTypesService } from "./catalogs/services/validation-types.service";
import { ComponentsService } from "./components/components.service";
import { CustomTokensService } from "./custom-tokens/custom-tokens.service";
import { FeatureVersionsService } from "./feature-versions/feature-versions.service";
import { FeaturesService } from "./features/features.service";
import { FormFieldValidationsService } from "./form-field-validations/form-field-validations.service";
import { FormFieldsService } from "./form-fields/form-fields.service";
import { GlobalComponentsService } from "./global-components/global-components.service";
import { GlobalStyleVariantsService } from "./global-style-variants/global-style-variants.service";
import { GlobalStylesService } from "./global-styles/global-styles.service";
import { LanguagesService } from "./i18n/languages.service";
import { TranslationKeysService } from "./i18n/translation-keys.service";
import { TranslationValuesService } from "./i18n/translation-values.service";
import { ReducerActionsService } from "./reducer-actions/reducer-actions.service";
import { ReducersService } from "./reducers/reducers.service";
import { ScreenComponentsService } from "./screen-components/screen-components.service";
import { ScreenVersionsService } from "./screen-versions/screen-versions.service";
import { ScreensService } from "./screens/screens.service";
import { StoresService } from "./stores/stores.service";
import { ThemeTokensService } from "./theme-tokens/theme-tokens.service";
import { ThemesService } from "./themes/themes.service";
import { UsersService } from "./users/users.service";

export default [
	AppsService,
	AuthService,
	AliasesService,
	ComponentTypesService,
	DefaultTokensService,
	FieldTypesService,
	PlansService,
	RolesService,
	StatusesService,
	TokenGroupAliasesService,
	TokenGroupsService,
	ValidationTypesService,
	ComponentsService,
	CustomTokensService,
	FeatureVersionsService,
	FeaturesService,
	FormFieldValidationsService,
	FormFieldsService,
	GlobalComponentsService,
	GlobalStyleVariantsService,
	GlobalStylesService,
	LanguagesService,
	TranslationKeysService,
	TranslationValuesService,
	ReducerActionsService,
	ReducersService,
	ScreenComponentsService,
	ScreenVersionsService,
	ScreensService,
	StoresService,
	ThemeTokensService,
	ThemesService,
	UsersService
]