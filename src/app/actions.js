'use server'
import { prisma } from '@/lib/prisma'

export async function getUsers() { return await prisma.user.findMany({ orderBy: { createdAt: 'desc' } }) }
export async function createUser(data) { return await prisma.user.create({ data }) }
export async function updateUser(id, data) { return await prisma.user.update({ where: { id: Number(id) }, data }) }
export async function deleteUser(id) { return await prisma.user.delete({ where: { id: Number(id) } }) }

export async function getPosts() { return await prisma.post.findMany({ orderBy: { id: 'desc' } }) }
export async function getPost(id) { return await prisma.post.findUnique({ where: { id: Number(id) } }) }
export async function createPost(data) { return await prisma.post.create({ data }) }
export async function updatePost(id, data) { return await prisma.post.update({ where: { id: Number(id) }, data }) }
export async function deletePost(id) { return await prisma.post.delete({ where: { id: Number(id) } }) }

export async function getGalleries() { return await prisma.gallery.findMany({ orderBy: { id: 'desc' } }) }
export async function getGallery(id) { return await prisma.gallery.findUnique({ where: { id: Number(id) } }) }
export async function createGallery(data) { return await prisma.gallery.create({ data }) }
export async function updateGallery(id, data) { return await prisma.gallery.update({ where: { id: Number(id) }, data }) }
export async function deleteGallery(id) { return await prisma.gallery.delete({ where: { id: Number(id) } }) }

export async function getPopups() { return await prisma.popup.findMany({ orderBy: { id: 'desc' } }) }
export async function createPopup(data) { return await prisma.popup.create({ data }) }
export async function updatePopup(id, data) { return await prisma.popup.update({ where: { id: Number(id) }, data }) }
export async function deletePopup(id) { return await prisma.popup.delete({ where: { id: Number(id) } }) }

export async function getHistories() { return await prisma.history.findMany({ orderBy: { id: 'desc' } }) }
export async function createHistory(data) { return await prisma.history.create({ data }) }
export async function deleteHistory(id) { return await prisma.history.delete({ where: { id: Number(id) } }) }

export async function getSettingsObject() {
  try {
    const all = await prisma.setting.findMany()
    const obj = {}
    all.forEach(s => { obj[s.key] = JSON.parse(s.value) })
    return obj
  } catch (e) {
    return {}
  }
}
export async function saveSetting(key, value) {
  return await prisma.setting.upsert({
    where: { key },
    update: { value: JSON.stringify(value) },
    create: { key, value: JSON.stringify(value) }
  })
}
