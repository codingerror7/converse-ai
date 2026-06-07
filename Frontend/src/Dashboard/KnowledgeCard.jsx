"use client";

import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { Database, Plus, FileText, Globe, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KnowledgeCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sources, setSources] = useState([
    { id: 1, type: 'file', name: 'acme_operations_manual.pdf', size: '2.4 MB', count: '124 pages', status: 'indexed' },
    { id: 2, type: 'url', name: 'https://docs.acme.com/api/faq', size: 'N/A', count: '48 articles', status: 'indexed' },
    { id: 3, type: 'file', name: 'pricing_tier_matrix.json', size: '320 KB', count: '12 tables', status: 'indexing' }
  ]);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('file');

  const handleAddSource = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSources((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: newType,
        name: newName,
        size: newType === 'file' ? '1.2 MB' : 'N/A',
        count: newType === 'file' ? '14 pages' : '1 index link',
        status: 'indexing'
      }
    ]);

    setNewName('');
    setIsModalOpen(false);
  };

  return (
    <>
      <Card elevation="subtle" className="p-6 border-border/70 text-left space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-accent" />
            <h3 className="text-sm font-bold tracking-tight text-primary">Knowledge Bases</h3>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 rounded-lg bg-surface border border-border text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Sources List */}
        <div className="space-y-3">
          {sources.map((src) => {
            const IsUrl = src.type === 'url';
            return (
              <div 
                key={src.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border/40"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center border border-border text-secondary">
                    {IsUrl ? <Globe size={14} /> : <FileText size={14} />}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-semibold text-primary truncate max-w-[150px] sm:max-w-[200px]">
                      {src.name}
                    </p>
                    <p className="text-[10px] text-secondary">
                      {src.size !== 'N/A' ? `${src.size} \u2022 ` : ''} {src.count}
                    </p>
                  </div>
                </div>

                <div>
                  {src.status === 'indexed' ? (
                    <Badge variant="success" className="gap-1 flex items-center">
                      <CheckCircle2 size={10} /> Sync
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="gap-1 flex items-center">
                      <RefreshCw size={10} className="animate-spin" /> Indexing
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          Add Resource Channel
        </Button>
      </Card>

      {/* Popup Modal for adding source */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ingest Knowledge Source"
        size="sm"
      >
        <form onSubmit={handleAddSource} className="space-y-5 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-secondary">Source Channel</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNewType('file')}
                className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                  newType === 'file'
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-surface border-border text-secondary'
                }`}
              >
                Local File (.pdf, .json, .txt)
              </button>
              <button
                type="button"
                onClick={() => setNewType('url')}
                className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                  newType === 'url'
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-surface border-border text-secondary'
                }`}
              >
                Web URL Sitemap
              </button>
            </div>
          </div>

          <Input
            label={newType === 'file' ? 'Document Filename' : 'Website Link URL'}
            placeholder={newType === 'file' ? 'e.g. employee_rules.pdf' : 'e.g. https://acme.com/help'}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              size="md"
              type="submit"
              className="flex-1"
            >
              Start Ingestion
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
