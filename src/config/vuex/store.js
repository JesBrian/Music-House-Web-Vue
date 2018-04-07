import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalType: '', // 拟态框类型

    musicIsPlay: false, // 音乐播放/暂停状态
    musicVolumeStatus: true, // 音量开关状态
    musicVolumeLevel: 0.6,
    musicPlayModel: 'loop', // 三种播放模式 [ loop-歌单循环，single-loop-单曲循环，random-歌单里歌曲随机播放 ]
    musicPlayListNowIndex: 0, // 当前播放歌曲的下标 - 对应播放列表 musicPlayList 的数组下标
    musicPlayList: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
    musicPlayListContentShowStatus: false
  },

  mutations: {

    /**
     * 修改拟态框类型
     * @param state
     * @param type
     */
    changeModalType (state, type = '') {
      state.modalType = type
    },

    /**
     * 改变是否播放歌曲状态
     * @param state
     */
    changeMusicIsPlayStatus (state) {
      state.musicIsPlay = !state.musicIsPlay
    },

    /**
     * 改变音乐播放模式
     * @param state
     * @param type
     */
    changeMusicPlayModel (state, type = 'loop') {
      state.musicPlayModel = type
    },

    /**
     * 改变现在播放音乐在播放列表的索引号
     * @param state
     * @param option
     */
    changemusicPlayListNowIndex (state, option = {nowIndexNum: -1, prevOrNext: 'next'}) {
      state.musicIsPlay = true
      if (option.nowIndexNum === -1) {
        if ((option.prevOrNext === 'next') && ((state.musicPlayListNowIndex + 1) === state.musicPlayList.length)) {
          state.musicPlayListNowIndex = 0
        } else if ((option.prevOrNext === 'prev') && ((state.musicPlayListNowIndex - 1) === -1)) {
          state.musicPlayListNowIndex = state.musicPlayList.length - 1
        } else if ((option.prevOrNext === 'next') && ((state.musicPlayListNowIndex + 1) < state.musicPlayList.length)) {
          state.musicPlayListNowIndex++
        } else {
          state.musicPlayListNowIndex--
        }
      } else {
        state.musicPlayListNowIndex = option.nowIndexNum
      }
    },

    /**
     * 改变是否展示播放列表内容
     * @param state
     */
    changeMusicPlayListContentShowStatus (state) {
      state.musicPlayListContentShowStatus = !state.musicPlayListContentShowStatus
    },

    /**
     * 改变声音On或者Off状态
     * @param state
     */
    changeMusicVolumeStatus (state) {
      state.musicVolumeStatus = !state.musicVolumeStatus
    },

    /**
     * 删除特定/清空播放列表
     * @param state
     * @param delMusicListIndex
     */
    delMusicPlayList (state, delMusicListIndex) {
      if (delMusicListIndex === -1) {
        state.musicIsPlay = false
        state.musicPlayListNowIndex = 0
        state.musicPlayList = []
      } else {
        if (delMusicListIndex < state.musicPlayListNowIndex) {
          state.musicPlayListNowIndex--
        }
        state.musicPlayList.splice(delMusicListIndex, 1)
      }
    }
  }
})
