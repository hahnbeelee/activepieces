package com.activepieces.entity.subdocuments.field.connection.oauth2;

import com.activepieces.common.validation.EnumNamePattern;
import com.activepieces.entity.enums.OAuth2UserType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "userInputType",
        visible = true,
        defaultImpl = OAuth2EmptySettings.class)
@JsonSubTypes({
        @JsonSubTypes.Type(value = OAuth2LoginSettings.class, name = "CONNECTION")
})
@Setter
@SuperBuilder(toBuilder = true)
public abstract class OAuth2Settings {

  @EnumNamePattern(regexp = "CONNECTION")
  @JsonProperty
  @NotNull
  private OAuth2UserType userInputType;

}
