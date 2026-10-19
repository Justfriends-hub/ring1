import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { JournalArticle } from '../types';

export const JournalPage: React.FC = () => {
  const { articles, selectedArticleId, setSelectedArticleId, navigateTo } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<JournalArticle | null>(() => {
    return articles.find((a) => a.id === selectedArticleId) || null;
  });

  const categories = ['all', 'Handwerkskunst', 'Diamantenkunde', 'Inspiration'];

  const filteredArticles = articles.filter(
    (a) => activeCategory === 'all' || a.category === activeCategory
  );

  const handleRead = (article: JournalArticle) => {
    setReadingArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* If reading an article */}
      {readingArticle ? (
        <article className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          <button
            onClick={() => setReadingArticle(null)}
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#6B635A] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Journal-Übersicht</span>
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#B08D57] font-semibold">
              <span>{readingArticle.category}</span>
              <span>·</span>
              <span className="text-[#6B635A]">{readingArticle.readTime}</span>
            </div>
            <h1 className="font-serif text-[36px] sm:text-[48px] text-[#1C1917] font-normal leading-[1.15]">
              {readingArticle.title}
            </h1>
            <p className="text-[17px] text-[#6B635A] font-light leading-relaxed">
              {readingArticle.subtitle}
            </p>
            <div className="pt-2 text-[12px] text-[#8C877D] border-t border-[#E3DAC9]">
              Von {readingArticle.author} · Veröffentlicht am {readingArticle.date}
            </div>
          </div>

          <div className="aspect-16/9 bg-[#F5F0E8] border border-[#E3DAC9] overflow-hidden">
            <img
              src={readingArticle.image}
              alt={readingArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 text-[16px] text-[#1C1917] font-light leading-[1.75]">
            {readingArticle.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-[#E3DAC9] flex items-center justify-between text-xs text-[#6B635A]">
            <span>AURELIA Journal · Magazin für Edelsteinkunde & Goldschmiedekunst</span>
            <button
              onClick={() => navigateTo('shop')}
              className="text-[#B08D57] font-medium uppercase tracking-wider hover:underline"
            >
              Passende Ringe entdecken →
            </button>
          </div>
        </article>
      ) : (
        /* Journal Overview Catalog */
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Gedanken & Handwerk
            </span>
            <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
              Das AURELIA Journal
            </h1>
            <p className="text-[15px] text-[#6B635A] font-light">
              Hintergründe zur Goldschmiedekunst, Wissenswertes über die 4C der Diamanten und
              Inspiration für den perfekten Verlobungsring.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 px-4 text-[12px] uppercase tracking-[0.12em] transition-colors cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#1F2A24] text-[#FBF8F3] border-[#1F2A24]'
                    : 'bg-white text-[#6B635A] border-[#E3DAC9] hover:border-[#B08D57]'
                }`}
              >
                {cat === 'all' ? 'Alle Beiträge' : cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => handleRead(art)}
                className="group cursor-pointer bg-[#FBF8F3] border border-[#E3DAC9] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="aspect-16/10 overflow-hidden bg-[#F5F0E8]">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#B08D57] uppercase tracking-[0.14em] font-medium mb-2">
                      <span>{art.category}</span>
                      <span>·</span>
                      <span className="text-[#6B635A]">{art.readTime}</span>
                    </div>

                    <h3 className="font-serif text-[22px] text-[#1C1917] group-hover:text-[#B08D57] transition-colors leading-snug mb-2">
                      {art.title}
                    </h3>
                    <p className="text-[13px] text-[#6B635A] leading-relaxed line-clamp-3 font-light">
                      {art.excerpt}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1C1917] group-hover:text-[#B08D57] pt-4 mt-4 border-t border-[#E3DAC9]/60">
                    <span>Vollständigen Beitrag lesen</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
