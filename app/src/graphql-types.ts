export interface SessionInfo_sessionById_speaker {
  id: string
  name: string
}

export interface SessionInfo_sessionById {
  id: string
  title: string
  day: string
  room: string
  level: string
  speakers: SessionInfo_sessionById_speaker[]
}

export interface SessionInfo_user_favorite {
  id: string
}

export interface SessionInfo_user {
  id: string
  favorites: SessionInfo_user_favorite[]
}

export interface SessionInfo {
  sessionById: SessionInfo_sessionById | null
  user: SessionInfo_user | null
}

export interface SessionInfoVariables {
  id: string
}