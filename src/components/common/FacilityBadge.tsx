function FacilityBadge({ content }: { content: string }) {
  return (
    <div className="text-sm py-[6px] px-[4px] border border-slate-300 bg-slate-50 rounded-lg">
      {content}
    </div>
  )
}

export default FacilityBadge
