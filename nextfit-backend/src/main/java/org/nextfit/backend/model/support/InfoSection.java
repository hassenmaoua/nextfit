package org.nextfit.backend.model.support;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class InfoSection {
    @JsonProperty(value = "headline", required = true)
    @JsonPropertyDescription("Main title of the section. Must be clear, unique, and concise.")
    protected String headline;

    @JsonProperty(value = "subtitle", required = true)
    @JsonPropertyDescription("Subtitle providing extra context. Should be one or two simple sentences.")
    protected String subtitle;
}
