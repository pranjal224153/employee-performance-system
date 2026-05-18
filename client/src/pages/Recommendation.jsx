import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import ReactMarkdown from 'react-markdown';

const Recommendation = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState(location.state?.employee || null);
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!employee) {
      // If no employee data in state (direct navigation), fetch it
      const fetchEmployee = async () => {
        try {
          const { data } = await api.get('/employees');
          const emp = data.find(e => e._id === id);
          if (emp) setEmployee(emp);
          else setError('Employee not found');
        } catch (err) {
          setError('Failed to fetch employee details');
        }
      };
      fetchEmployee();
    }
  }, [id, employee]);

  const generateRecommendation = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/ai/recommend', { employeeData: employee });
      setRecommendation(data.recommendation);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate AI recommendation. Check API connection and OpenRouter Key.');
    } finally {
      setLoading(false);
    }
  };

  if (!employee && !error) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Employee Details Side */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Employee Profile</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.name}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.role}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.department}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Score</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold text-primary-600">
                    {employee.performanceScore}/100
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.map((skill, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* AI Recommendation Side */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 h-full flex flex-col">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white flex justify-between items-center rounded-t-lg">
              <div>
                <h3 className="text-lg leading-6 font-medium flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Performance Insights
                </h3>
                <p className="mt-1 max-w-2xl text-sm opacity-90">
                  Powered by deepseek-v4-flash (OpenRouter)
                </p>
              </div>
              <button
                onClick={generateRecommendation}
                disabled={loading}
                className="bg-white text-primary-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Generating...' : 'Generate New Insights'}
              </button>
            </div>
            <div className="p-6 flex-1 bg-gray-50">
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {!recommendation && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                  <Sparkles className="w-12 h-12 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No insights generated yet</p>
                  <p className="text-sm mt-1">Click the button above to generate AI-powered recommendations.</p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-primary-600 py-12 space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  <p className="font-medium animate-pulse">Analyzing employee data...</p>
                </div>
              )}

              {recommendation && !loading && (
                <div className="prose prose-primary max-w-none bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <ReactMarkdown>{recommendation}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
