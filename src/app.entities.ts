import { App } from "./apps/entities/app.entity";
import { Alias } from "./catalogs/entities/alias.entity";
import { ComponentType } from "./catalogs/entities/component-type.entity";
import { DefaultToken } from "./catalogs/entities/default-token.entity";
import { FieldType } from "./catalogs/entities/field-type.entity";
import { Plan } from "./catalogs/entities/plan.entity";
import { Role } from "./catalogs/entities/role.entity";
import { Status } from "./catalogs/entities/status.entity";
import { TokenGroupAlias } from "./catalogs/entities/token-group-alias.entity";
import { TokenGroup } from "./catalogs/entities/token-group.entity";
import { ValidationType } from "./catalogs/entities/validation-type.entity";
import { ComponentProperty } from "./components/entities/component-property.entity";
import { Component } from "./components/entities/component.entity";
import { CustomToken } from "./custom-tokens/entities/custom-token.entity";
import { FeatureVersion } from "./feature-versions/entities/feature-version.entity";
import { Feature } from "./features/entities/feature.entity";
import { FormFieldValidation } from "./form-field-validations/entities/form-field-validation.entity";
import { FormField } from "./form-fields/entities/form-field.entity";
import { GlobalComponent } from "./global-components/entities/global-component.entity";
import { GlobalStyleVariant } from "./global-style-variants/entities/global-style-variant.entity";
import { GlobalStyle } from "./global-styles/entities/global-style.entity";
import { Language } from "./i18n/entities/language.entity";
import { TranslationKey } from "./i18n/entities/translation-key.entity";
import { TranslationValue } from "./i18n/entities/translation-value.entity";
import { ReducerAction } from "./reducer-actions/entities/reducer-action.entity";
import { Reducer } from "./reducers/entities/reducer.entity";
import { ScreenComponent } from "./screen-components/entities/screen-component.entity";
import { ScreenVersion } from "./screen-versions/entities/screen-version.entity";
import { Screen } from "./screens/entities/screen.entity";
import { Store } from "./stores/entities/store.entity";
import { ThemeToken } from "./theme-tokens/entities/theme-token.entity";
import { Theme } from "./themes/entities/theme.entity";
import { User } from "./users/entities/user.entity";

export default [
	App,
	Alias,
	ComponentType,
	DefaultToken,
	FieldType,
	Plan,
	Role,
	Status,
	TokenGroupAlias,
	TokenGroup,
	ValidationType,
	ComponentProperty,
	Component,
	CustomToken,
	FeatureVersion,
	Feature,
	FormFieldValidation,
	FormField,
	GlobalComponent,
	GlobalStyleVariant,
	GlobalStyle,
	Language,
	TranslationKey,
	TranslationValue,
	ReducerAction,
	Reducer,
	ScreenComponent,
	ScreenVersion,
	Screen,
	Store,
	ThemeToken,
	Theme,
	User
]