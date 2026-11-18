import { createRouter, createWebHashHistory } from 'vue-router'
import RecordView from '../views/RecordView.vue'
import HistoryView from '../views/HistoryView.vue'
import DetailView from '../views/DetailView.vue'
import RecycleBinView from '../views/RecycleBinView.vue'

const routes = [
  { path: '/', redirect: '/record' },
  { path: '/record', name: 'record', component: RecordView, meta: { title: '记账' } },
  { path: '/record/:id', name: 'record-edit', component: RecordView, meta: { title: '编辑交易' } },
  { path: '/history', name: 'history', component: HistoryView, meta: { title: '历史' } },
  { path: '/history/:id', name: 'detail', component: DetailView, meta: { title: '详情' } },
  { path: '/trash', name: 'trash', component: RecycleBinView, meta: { title: '回收站' } }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
