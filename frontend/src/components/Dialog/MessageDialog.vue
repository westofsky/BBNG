<template>
    <Transition name="MessageDialog">
        <div v-if="show" class="MessageDialog-Mask" @keyup.esc="$emit('close')" tabindex="0">
            <div class="MessageDialog-Wrapper">
                <div class="MessageDialog-Container">
                    <div class="MessageDialog-Header">
                        <label class="MessageDialog-Title">{{ title }}</label>
                    </div>
                    <div class="MessageDialog-Body">
                        <label class="Message">{{ message }}</label>
                    </div>

                    <div class="MessageDialog-Footer">
                        <button class="BtnOk BtnText" @click="onBtnOkClicked">확인</button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'MessageDialog',
    data() {
        return {
            title: '',
            message: '',
        }
    },
    props: {
        show: Boolean,
    },
    methods: {
        mounted() {
        },
        init(title, message) {
            this.title = title;
            this.message = message;
        },
        onBtnOkClicked() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.MessageDialog-Mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    text-align: center;
}

.MessageDialog-Wrapper {
    display: table-cell;
    vertical-align: middle;
}

.MessageDialog-Container {
    width: 320px;
    margin: 0px auto;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
}

.MessageDialog-Header {
    height: 48px;
    display: flex;
    justify-content: center;
    background-color: rgb(70, 199, 135);
}

.MessageDialog-Title {
    font-size: 18pt;
    font-weight: bold;
    padding: 8px;
    color: #ffffff;
    user-select: none;
}

.MessageDialog-Body {
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
}

.MessageDialog-Footer {
    height: 48px;
    background-color: #525252;
    display: flex;
    flex-direction: row;
}

.Message {
    font-size: 16pt;
    font-weight: bold;
    color: #9e9e9e;
    user-select: none;
}

.BtnOk {
    background-color: #6884e0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0px;
}

.BtnOk:hover:enabled {
    background-color: #5e77ca;
}

.BtnOk:active:enabled {
    background-color: #5268b3;
}

.BtnOk:disabled {
    background-color: #374677;
}

.BtnText {
    font-size: 16pt;
    font-weight: bold;
    color: #ffffff;
    user-select: none;
}

.BtnText:disabled {
    color: #777777;
}

/*
 * The following styles are auto-applied to elements with
 * transition="MessageDialog" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the MessageDialog transition by editing
 * these styles.
 */

.MessageDialog-enter-from {
    opacity: 0;
}

.MessageDialog-leave-to {
    opacity: 0;
}

.MessageDialog-enter-from .MessageDialog-Container,
.MessageDialog-leave-to .MessageDialog-Container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>