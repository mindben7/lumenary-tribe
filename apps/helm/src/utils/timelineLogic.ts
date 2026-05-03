export interface TimelineEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  track?: number; 
}

export function assignTracks(events: TimelineEvent[]): TimelineEvent[] {
  // Sort events chronologically (History -> Present)
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  
  // Track the end-time for each occupied lane: { trackNumber: timestamp }
  const trackEndTimes: Record<number, number> = {};
  
  // Track preference order (Up 1, Down 1, Up 2, Down 2...)
  // We avoid 0 to keep the center line clear like a "trunk"
  const trackOrder = [1, -1, 2, -2, 3, -3];

  return sorted.map(event => {
    let assignedTrack = 1;
    
    for (const track of trackOrder) {
      // If track is empty, OR the event starts after the track's previous event ends
      if (!trackEndTimes[track] || event.start.getTime() >= trackEndTimes[track]) {
        assignedTrack = track;
        break;
      }
    }
    
    // Add 5 days of visual "padding" so nodes don't physically touch
    const padding = 1000 * 60 * 60 * 24 * 5; 
    trackEndTimes[assignedTrack] = event.end.getTime() + padding; 

    return { ...event, track: assignedTrack };
  });
}