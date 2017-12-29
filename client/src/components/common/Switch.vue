<template>
  <div class="switch-container">

    <!-- The actual switcher -->
    <label class="switch">

      <!-- The hidden input element for the boolean value -->
      <input type="checkbox"
             v-model="internalChecked"/>

      <!-- The span element used to style the switcher -->
      <span class="slider"/>

    </label>

    <!-- Show the associated value for the toggle -->
    <span class="selection"
          v-if="values">
      {{ selection }}
    </span>

  </div>
</template>

<script>
  /* Parameter */
  const cssId = 'css-switch' // Name of the CSS tag to create.

  export default {
    name: 'v-switch',

    model: {
      prop: 'checked', // Rename from default 'value' property.
      event: 'change' // Rename from default 'input' event.
    },

    props: {
      checked: Boolean,
      size: {
        type: Number,
        default: 20
      },
      values: {
        type: Array,
        required: false,
        validator (value) {
          // Make sure the array contains exactly 2 entries.
          return value.length === 2
        }
      }
    },

    data () {
      return {
        // Use a internal checked model bind to the checkbox input.
        internalChecked: this.checked
      }
    },

    watch: {
      internalChecked (value) {
        // Emit the change of the value.
        this.$emit('change', Boolean(value))
      }
    },

    computed: {
      // Get the representational value to the toggle.
      selection () {
        if (!this.values) {
          // In case no values are given, the span will not be shown.
          return null
        } else {
          // Select the value to the current state.
          if (this.internalChecked) {
            return this.values[0]
          } else {
            return this.values[1]
          }
        }
      },

      cssTag () {
        return '.switch-container {' +
               '  --switch-height: ' + this.size + 'px;' +
               '}'
      }
    },

    created () {
      // Create an CSS tag with variables that can't be set directly.
      const css = document.createElement('style')
      css.id = cssId
      css.type = 'text/css'
      css.innerHTML = this.cssTag
      document.body.insertBefore(css, document.body.firstChild)
    }
  }
</script>

<style lang="scss">

  // Load the CSS variable set by the component.
  $switchHeight: var(--switch-height, 20px);

  // Define other variables depending on this CSS variable.
  $switchWidth: calc(2 * #{$switchHeight});
  $toggleSize: calc(#{$switchHeight} * 0.7);
  $toggleMargin: calc((#{$switchHeight} - #{$toggleSize}) / 2);

  // Define color variables.
  $toggleColor: gray;

  .switch-container {
    /* Flow */
    display: flex;
    flex-flow: row;

    .switch {
      position: relative;
      display: inline-block;
      width: $switchWidth;
      height: $switchHeight;

      // Hide default checkbox.
      input {
        display: none;
      }

      .slider {
        /* Position & Shape */
        position: absolute;
        cursor: pointer;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        /* Style */
        border-radius: calc(0.7 * #{$switchHeight});
        background-color: white;

        /* Transition */
        -webkit-transition: .4s;
        transition: .4s;
      }

      // The circle to toggle.
      .slider:before {
        /* Position & Shape */
        position: absolute;
        bottom: $toggleMargin;
        left: $toggleMargin;
        width: $toggleSize;
        height: $toggleSize;
        background-color: $toggleColor;

        /* Style */
        content: "";
        border-radius: 50%;

        /* Transition */
        -web-transition: .4s;
        transition: .4s;
      }

      // Color effect when true.
      input:checked + .slider {
        background-color: lightgray;
      }

      // Move toggle from left to right.
      input:checked + .slider:before {
        /* Transition */
        $transitionWidth: calc(#{$switchWidth} - (2 * #{$toggleMargin}) - #{$toggleSize});
        -webkit-transform: translateX($transitionWidth);
        -ms-transform: translateX($transitionWidth);
        transform: translateX($transitionWidth);
      }
    }

    .selection {
      display: inline-block;
      color: white;
      $fontSize: calc(0.7 * #{$switchHeight});
      font-size: $fontSize;
      line-height: $fontSize;
      max-height: $fontSize;
      padding: calc((#{$switchHeight} - #{$fontSize}) / 2) 0; // Center text vertically.
      margin: 0 2px; // Center vertically and small gab to the toggle.
    }
  }
</style>
