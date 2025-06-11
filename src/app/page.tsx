import { GlassCard } from '@/components/ui/GlassCard'
// Make sure the Button component exists at the specified path.
// If it does not, either create the file at src/components/ui/Button.tsx or update the import path to the correct location.
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { WeatherIcon } from '@/components/ui/WeatherIcon'
import { Search } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Weather App Components Test</h1>
        
        {/* Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-2">Default Card</h3>
            <p className="text-white/70">This is a glass morphism card</p>
          </GlassCard>
          
          <GlassCard variant="subtle" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Subtle Card</h3>
            <p className="text-white/70">More transparent variant</p>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Strong Card</h3>
            <p className="text-white/70">More opaque variant</p>
          </GlassCard>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button>Glass Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button loading>Loading...</Button>
        </div>
        
        {/* Input */}
        <div className="max-w-md">
          <Input 
            placeholder="Search for location..." 
            leftIcon={<Search className="h-4 w-4" />}
            clearable
          />
        </div>
        
        {/* Weather Icons */}
        <div className="flex flex-wrap gap-6 items-center">
          <WeatherIcon condition="sunny" size="lg" />
          <WeatherIcon condition="cloudy" size="lg" />
          <WeatherIcon condition="rain" size="lg" animated />
          <WeatherIcon condition="thunderstorm" size="lg" />
          <WeatherIcon condition="snow" size="lg" />
        </div>
      </div>
    </main>
  )
}