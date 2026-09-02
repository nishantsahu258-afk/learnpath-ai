import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Forms';
import { Sparkles } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export function LearnerProfile() {
  const navigate = useNavigate();
  const { saveProfile } = useLearning();
  
  const [formData, setFormData] = useState({
    goal: 'Full Stack Web Development',
    reason: 'To build my own web apps and start a career as a developer',
    level: 'Beginner',
    dailyTime: '1 - 2 hours',
    duration: '3 Months'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.goal.trim()) newErrors.goal = "Required";
    if (!formData.reason.trim()) newErrors.reason = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveProfile(formData);
      navigate('/generating');
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          Let's build your <br />
          personalized learning path <Sparkles className="text-fuchsia-400 inline" />
        </h1>
        <p className="text-slate-400 text-lg">
          Tell us about yourself and your goals. Our AI will create the perfect roadmap just for you.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="What do you want to learn?"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            error={errors.goal}
            placeholder="e.g. Full Stack Web Development"
          />
          
          <Input 
            label="Why do you want to learn this?"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            error={errors.reason}
            placeholder="e.g. To get a job as a developer"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select 
              label="Current Skill Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={[
                { value: 'Absolute Beginner', label: 'Absolute Beginner' },
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' }
              ]}
            />
            <Select 
              label="Daily Time Available"
              name="dailyTime"
              value={formData.dailyTime}
              onChange={handleChange}
              options={[
                { value: '30 mins', label: '30 mins' },
                { value: '1 hour', label: '1 hour' },
                { value: '1 - 2 hours', label: '1 - 2 hours' },
                { value: '3+ hours', label: '3+ hours' }
              ]}
            />
            <Select 
              label="Preferred Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              options={[
                { value: '1 Month', label: '1 Month' },
                { value: '3 Months', label: '3 Months' },
                { value: '6 Months', label: '6 Months' }
              ]}
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit" variant="gradient" className="w-full text-lg py-4">
              <Sparkles size={20} />
              Generate My Learning Path
            </Button>
            <p className="text-center text-slate-500 text-sm mt-4">
              ⚡ It only takes a few seconds to create your custom path
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
