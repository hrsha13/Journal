"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

interface JournalMeta {
  issn: string
  journal_name: string
}

export function JournalHeader() {
  const [journalMeta, setJournalMeta] = useState<JournalMeta>({ issn: "", journal_name: "" })

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const { data } = await supabase.from("journal_settings").select("setting_key, setting_value")

        const meta: JournalMeta = { issn: "", journal_name: "" }

        data?.forEach((item) => {
          if (item.setting_key === "issn") meta.issn = item.setting_value
          if (item.setting_key === "journal_name") meta.journal_name = item.setting_value
        })

        setJournalMeta(meta)
      } catch (error) {
        console.error("Failed to load journal metadata:", error)
      }
    }

    fetchMeta()
  }, [])

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{journalMeta.journal_name || "Journal"}</h1>
            {journalMeta.issn && (
              <p className="text-sm text-muted-foreground">
                ISSN: <span className="font-mono font-semibold">{journalMeta.issn}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
