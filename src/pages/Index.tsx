import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [score, setScore] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [autoClickValue, setAutoClickValue] = useState(0);
  const [clickAnimation, setClickAnimation] = useState(false);

  // Auto-clicker effect
  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setScore(prev => prev + autoClickValue);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers, autoClickValue]);

  const handleClick = () => {
    setScore(prev => prev + clickValue);
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 200);
  };

  const buyAutoClicker = () => {
    const cost = Math.floor(10 * Math.pow(1.5, autoClickers));
    if (score >= cost) {
      setScore(prev => prev - cost);
      setAutoClickers(prev => prev + 1);
      setAutoClickValue(prev => prev + 1);
    }
  };

  const buyClickUpgrade = () => {
    const cost = Math.floor(50 * Math.pow(2, clickValue - 1));
    if (score >= cost) {
      setScore(prev => prev - cost);
      setClickValue(prev => prev + 1);
    }
  };

  const autoClickerCost = Math.floor(10 * Math.pow(1.5, autoClickers));
  const clickUpgradeCost = Math.floor(50 * Math.pow(2, clickValue - 1));

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #FF6B35 0%, #96CEB4 50%, #FFEAA7 100%)',
      fontFamily: '"Press Start 2P", monospace'
    }}>
      {/* Header */}
      <div className="p-4 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl text-white drop-shadow-lg">ПИКСЕЛЬ КЛИКЕР</h1>
          <div className="flex gap-4 items-center">
            <Badge variant="secondary" className="text-lg px-3 py-1 bg-white/90">
              💰 {score.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="text-sm px-2 py-1 bg-white/80">
              🤖 {autoClickers} авто
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Clicker Area */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center min-h-96">
          <div className="text-center mb-8">
            <h2 className="text-4xl text-white drop-shadow-lg mb-2">
              {score.toLocaleString()}
            </h2>
            <p className="text-white/80 text-sm">ОЧКИ</p>
          </div>
          
          <Button
            onClick={handleClick}
            className={`w-48 h-48 rounded-lg text-4xl transition-all duration-200 
              ${clickAnimation ? 'scale-110 shadow-2xl' : 'scale-100'} 
              bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700
              border-4 border-white/20 shadow-xl`}
            style={{ 
              fontFamily: '"Press Start 2P", monospace',
              imageRendering: 'pixelated'
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-6xl">🎯</div>
              <div className="text-sm">КЛИК</div>
            </div>
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-white/80 text-xs">+{clickValue} за клик</p>
            {autoClickers > 0 && (
              <p className="text-cyan-200 text-xs">+{autoClickValue}/сек авто</p>
            )}
          </div>
        </div>

        {/* Shop/Upgrades */}
        <div className="space-y-4">
          <Card className="p-4 bg-black/80 border-2 border-white/20 backdrop-blur-sm">
            <h3 className="text-white text-lg mb-4 flex items-center gap-2">
              <Icon name="ShoppingCart" size={20} />
              МАГАЗИН
            </h3>
            
            {/* Auto Clicker Upgrade */}
            <div className="space-y-3">
              <Card className="p-3 bg-white/10 border border-cyan-400/50">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-cyan-300 text-sm">🤖 АВТО КЛИКЕР</div>
                    <div className="text-white/60 text-xs">+1/сек пассивно</div>
                  </div>
                  <Badge className="bg-orange-500 text-white text-xs">
                    {autoClickerCost}
                  </Badge>
                </div>
                <Button 
                  onClick={buyAutoClicker}
                  disabled={score < autoClickerCost}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-xs"
                >
                  КУПИТЬ ({autoClickers} шт.)
                </Button>
              </Card>

              {/* Click Power Upgrade */}
              <Card className="p-3 bg-white/10 border border-orange-400/50">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-orange-300 text-sm">⚡ УСИЛЕНИЕ</div>
                    <div className="text-white/60 text-xs">+1 за клик</div>
                  </div>
                  <Badge className="bg-orange-500 text-white text-xs">
                    {clickUpgradeCost}
                  </Badge>
                </div>
                <Button 
                  onClick={buyClickUpgrade}
                  disabled={score < clickUpgradeCost}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 text-xs"
                >
                  КУПИТЬ (Ур. {clickValue})
                </Button>
              </Card>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-4 bg-black/80 border-2 border-white/20 backdrop-blur-sm">
            <h3 className="text-white text-lg mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              СТАТИСТИКА
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-white/80">
                <span>Всего очков:</span>
                <span>{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Сила клика:</span>
                <span>{clickValue}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Авто кликеры:</span>
                <span>{autoClickers}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Доход/сек:</span>
                <span>{autoClickValue}</span>
              </div>
            </div>
          </Card>

          {/* Achievements Preview */}
          <Card className="p-4 bg-black/80 border-2 border-white/20 backdrop-blur-sm">
            <h3 className="text-white text-lg mb-4 flex items-center gap-2">
              <Icon name="Trophy" size={20} />
              ДОСТИЖЕНИЯ
            </h3>
            <div className="space-y-2">
              <div className={`p-2 rounded border ${score >= 100 ? 'bg-yellow-500/20 border-yellow-500' : 'bg-gray-500/20 border-gray-500'}`}>
                <div className="text-xs text-white/80">🏆 Первая сотня</div>
                <div className="text-xs text-white/60">Набрать 100 очков</div>
                <Progress value={Math.min(100, (score / 100) * 100)} className="h-1 mt-1" />
              </div>
              <div className={`p-2 rounded border ${autoClickers >= 5 ? 'bg-yellow-500/20 border-yellow-500' : 'bg-gray-500/20 border-gray-500'}`}>
                <div className="text-xs text-white/80">🤖 Армия роботов</div>
                <div className="text-xs text-white/60">Купить 5 авто кликеров</div>
                <Progress value={Math.min(100, (autoClickers / 5) * 100)} className="h-1 mt-1" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;