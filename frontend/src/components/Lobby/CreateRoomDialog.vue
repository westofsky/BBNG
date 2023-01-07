<script>
export default {
    props: {
        show: Boolean
    }
}
</script>

<template>
    <Transition name="CreateRoomDialog">
        <div v-if="show" class="CreateRoomDialog-Mask">
            <div class="CreateRoomDialog-Wrapper">
                <div class="CreateRoomDialog-Container">
                    <div class="CreateRoomDialog-Header">
                        <label class="CreateRoomDialog-Title">새로운 방 만들기</label>
                    </div>
                    <div class="CreateRoomDialog-Body">
                        <div class="OptionGroup">
                            <label class="OptionTitle">방 이름</label>
                            <div class="OptionArea">
                                <label>옵션</label>
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">방 이름</label>
                            <div class="OptionArea">
                                <label>옵션</label>
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">방 이름</label>
                            <div class="OptionArea">
                                <label>옵션</label>
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">방 이름</label>
                            <div class="OptionArea">
                                <label>옵션</label>
                            </div>
                        </div>
                        <!-- <slot name="body">default body</slot> -->
                    </div>

                    <div class="CreateRoomDialog-Footer">
                        <slot name="footer">
                            default footer
                            <button @click="$emit('close')">OK</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.CreateRoomDialog-Mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.CreateRoomDialog-Wrapper {
    display: table-cell;
    vertical-align: middle;
}

.CreateRoomDialog-Container {
    width: 300px;
    margin: 0px auto;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
}

.CreateRoomDialog-Header {
    display: flex;
    justify-content: center;
    background-color: rgb(70, 199, 135);
}

.CreateRoomDialog-Title {
    font-size: 16pt;
    font-weight: bold;
    padding: 8px;
    color: #ffffff;
}

.CreateRoomDialog-Body {
    display: flex;
    flex-direction: column;
}

.OptionGroup {
    display: flex;
    flex-direction: row;
}

.OptionTitle {
    background-color: #d81c1c;
}

.OptionArea {
    flex: 1;
    background-color: aqua;
}

/*
 * The following styles are auto-applied to elements with
 * transition="CreateRoomDialog" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the CreateRoomDialog transition by editing
 * these styles.
 */

.CreateRoomDialog-enter-from {
    opacity: 0;
}

.CreateRoomDialog-leave-to {
    opacity: 0;
}

.CreateRoomDialog-enter-from .CreateRoomDialog-Container,
.CreateRoomDialog-leave-to .CreateRoomDialog-Container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>