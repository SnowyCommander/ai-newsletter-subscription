import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Mail, 
  Zap, 
  Clock, 
  Users, 
  Brain, 
  Globe, 
  CheckCircle, 
  Sparkles,
  TrendingUp,
  Database,
  Filter,
  MessageSquare,
  Star
} from 'lucide-react'

const API_BASE_URL = 'https://ai-newsletter-backend.snowycommander.workers.dev'

function App() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage(data.message)
        setEmail('')
      } else {
        setMessage(data.message || '구독에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('구독 실패:', error)
      setMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>
      
      {/* 메시지 표시 */}
      {message && (
        <div className="fixed top-6 right-6 max-w-md p-4 rounded-2xl shadow-2xl z-50 bg-white/10 backdrop-blur-lg border border-white/20 animate-in slide-in-from-right-5 duration-300">
          <div className="flex items-center gap-3">
            {message.includes('완료') ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <Zap className="w-6 h-6 text-red-400" />
            )}
            <p className={`text-sm font-medium ${message.includes('완료') ? 'text-green-100' : 'text-red-100'}`}>
              {message}
            </p>
          </div>
        </div>
      )}

      {/* 히어로 섹션 */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        {/* 그라디언트 오브 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 text-sm font-medium mb-8 animate-in fade-in duration-1000">
            <Sparkles className="w-4 h-4" />
            AI 인사이트 구독 서비스
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-in slide-in-from-bottom-10 duration-1000 delay-200">
            AI 최전선의<br />
            <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">진짜 트렌드</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-8 animate-in slide-in-from-bottom-10 duration-1000 delay-400">
            <Clock className="w-6 h-6 text-cyan-300" />
            <p className="text-2xl md:text-3xl text-purple-100 font-semibold">5분 핵심 요약</p>
          </div>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-600">
            글로벌 AI 커뮤니티의 최신 인사이트를<br />
            <span className="text-cyan-200 font-semibold">매주 정교하게 요약</span>하여 전달합니다
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto animate-in slide-in-from-bottom-10 duration-1000 delay-800">
            <div className="flex gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 bg-transparent border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-purple-400 text-lg h-14"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    처리중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    무료 구독하기
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 문제 정의 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
              AI 정보, 이래서 놓칩니다
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Clock, title: "시간 낭비", desc: "30분 영상, 핵심은 2분", color: "from-red-500 to-pink-500" },
              { icon: Filter, title: "알고리즘 함정", desc: "늘 비슷한 추천 콘텐츠", color: "from-orange-500 to-red-500" },
              { icon: TrendingUp, title: "뒤늦은 발견", desc: "이미 대세가 바뀌었다고?", color: "from-pink-500 to-red-500" },
              { icon: Globe, title: "언어 장벽", desc: "국외 커뮤니티는 영어라...", color: "from-red-500 to-orange-500" }
            ].map((item, index) => (
                             <Card key={index} className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 !bg-white/5 !text-white">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-red-300 group-hover:text-red-200 transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-purple-200 text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 해결책 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            매주 AI 트렌드 추적<br />핵심 요약
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-16"></div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { 
                icon: Globe, 
                title: "글로벌 모니터링", 
                items: ["국내외 유명 커뮤니티", "국내외 유명 IT 리더"],
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Zap, 
                title: "5분 완독", 
                items: ["핵심 요약", "트렌드 의견 추가"],
                color: "from-cyan-500 to-blue-500"
              }
            ].map((item, index) => (
                             <Card key={index} className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 !bg-white/5 !text-white">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-300 group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-3">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="flex items-center gap-3 text-blue-200 text-lg">
                        <Star className="w-5 h-5 text-yellow-400" />
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30">
            <Brain className="w-8 h-8 text-cyan-300" />
            <p className="text-2xl font-bold text-cyan-200">진짜 AI 최전선을 만나세요</p>
          </div>
        </div>
      </section>

      {/* 신뢰성 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              매주 이만큼 분석합니다
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Database, number: "10,000+", desc: "글로벌 게시물 스캔", color: "from-purple-500 to-pink-500" },
              { icon: Users, number: "15개", desc: "해외 커뮤니티 분석", color: "from-blue-500 to-purple-500" },
              { icon: Brain, number: "100+", desc: "자체 분석 정교화 기능", color: "from-cyan-500 to-blue-500" }
            ].map((item, index) => (
                             <Card key={index} className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:transform hover:scale-110 text-center !bg-white/5 !text-white">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>
                <CardHeader className="relative pb-2">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {item.number}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-purple-200 text-lg font-medium">
                    {item.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOMO 유발 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 mb-8">
            <Zap className="w-6 h-6 text-red-300" />
            <h2 className="text-3xl md:text-4xl font-bold text-red-300">한정 무료 공개</h2>
          </div>
          
          <div className="space-y-6 text-lg md:text-xl text-red-200 leading-relaxed">
            <p className="animate-pulse">광고 없이 오직 입소문으로만</p>
            <p>이 페이지를 다시 찾기는 어렵습니다</p>
            <p>AI 시스템 운영 비용으로</p>
            <p>무료 구독은 선착순 제한됩니다</p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl animate-pulse">
              <Clock className="w-6 h-6" />
              지금이 마지막 기회일 수 있습니다
            </div>
          </div>
        </div>
      </section>

      {/* 가입 혜택 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            즉시 받는 보너스
          </h2>
          
          <Card className="max-w-md mx-auto relative overflow-hidden bg-white/5 backdrop-blur-lg border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 !bg-white/5 !text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
            <CardHeader className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-green-300">실전 AI 툴 가이드</CardTitle>
              <CardDescription className="text-lg text-green-200">AI 에이전트를 위한 가이드</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-green-400" />
                <p className="text-green-300 font-semibold text-lg">가입 즉시 이메일로 전송</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 간편 가입 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-green-600/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
            5초면 충분합니다
          </h2>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300" />
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 bg-transparent border-none text-white placeholder:text-emerald-300 focus:ring-2 focus:ring-emerald-400 text-lg h-14"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    처리중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    무료 구독하기
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              자주 묻는 질문
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Q: 정말 무료인가요?", a: "A: 네, 100% 무료입니다", icon: CheckCircle },
              { q: "Q: 영상보다 효율적인가요?", a: "A: 30분 → 3분, 10배 효율", icon: TrendingUp },
              { q: "Q: 영어 몰라도 되나요?", a: "A: 완벽한 한국어 번역 제공", icon: Globe },
              { q: "Q: 왜 Reddit인가요?", a: "A: 유튜브보다 빠른 정보", icon: MessageSquare }
            ].map((item, index) => (
                             <Card key={index} className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-[1.02] !bg-white/5 !text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-blue-300 group-hover:text-blue-200 transition-colors">
                      {item.q}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative pl-20">
                  <p className="text-purple-200 text-lg font-medium">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 최종 CTA 섹션 */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* 애니메이션 파티클 */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Clock className="w-6 h-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold">지금이 마지막 기회</h2>
          </div>
          
          <p className="text-2xl md:text-3xl mb-12 font-semibold">매주 진짜 AI 트렌드를 받아보세요</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: CheckCircle, text: "무료 구독" },
              { icon: Zap, text: "즉시 취소 가능" },
              { icon: Clock, text: "30분 → 3분 요약" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-xl font-semibold">
                <item.icon className="w-6 h-6 text-green-300" />
                {item.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 bg-transparent border-none text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/30 text-lg h-14"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-14 px-8 bg-white text-purple-600 hover:bg-white/90 font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                    처리중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    무료 구독하기
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-8 text-purple-300">
            <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">이용약관</a>
            <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">개인정보보호</a>
            <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">주식회사 튜링스</a>
          </div>
          <div className="mt-6 text-purple-400/60 text-sm">
            © 2025 Turings. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App